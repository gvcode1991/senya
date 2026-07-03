import dotenv from "dotenv";

dotenv.config({ quiet: true });

function hasValue(name) {
  return Boolean(String(process.env[name] || "").trim());
}

function timeoutAfter(timeoutMs, message) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), timeoutMs);
  });
}

async function readJsonResponse(response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { message: text.slice(0, 200) };
  }
}

async function checkMongo() {
  if (!hasValue("MONGODB_URI")) {
    return { service: "mongodb", ok: false, configured: false, reason: "missing-mongodb-uri" };
  }

  const { default: mongoose } = await import("mongoose");

  try {
    await Promise.race([
      mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DB_NAME,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 10000,
      }),
      timeoutAfter(15000, "mongodb-timeout"),
    ]);
    const result = {
      service: "mongodb",
      ok: true,
      configured: true,
      database: mongoose.connection.db.databaseName,
      readyState: mongoose.connection.readyState,
    };
    await mongoose.disconnect();
    return result;
  } catch (error) {
    await mongoose.disconnect().catch(() => {});
    return { service: "mongodb", ok: false, configured: true, message: error.message.split("\n")[0] };
  }
}

async function checkCloudinary() {
  const configured = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"].every(hasValue);

  if (!configured) {
    return { service: "cloudinary", ok: false, configured: false, reason: "missing-cloudinary-env" };
  }

  const { v2: cloudinary } = await import("cloudinary");

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = await Promise.race([
      cloudinary.api.ping(),
      timeoutAfter(15000, "cloudinary-timeout"),
    ]);
    return { service: "cloudinary", ok: result.status === "ok", configured: true, status: result.status };
  } catch (error) {
    return { service: "cloudinary", ok: false, configured: true, message: error.message };
  }
}

async function checkResend() {
  const configured = hasValue("RESEND_API_KEY") && hasValue("RESEND_FROM");

  if (!configured) {
    return { service: "resend", ok: false, configured: false, reason: "missing-resend-env" };
  }

  try {
    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      signal: AbortSignal.timeout(15000),
    });
    const data = await readJsonResponse(response);
    return {
      service: "resend",
      ok: response.ok,
      configured: true,
      status: response.status,
      detail: response.ok ? "api-key-accepted" : data.message || data.error || "request-failed",
    };
  } catch (error) {
    return { service: "resend", ok: false, configured: true, message: error.message };
  }
}

async function checkRender() {
  const renderHealthUrl = process.env.RENDER_HEALTH_URL || "";

  if (!renderHealthUrl) {
    return { service: "render", ok: false, configured: false, reason: "missing-render-health-url" };
  }

  try {
    const response = await fetch(renderHealthUrl, { signal: AbortSignal.timeout(90000) });
    const data = await readJsonResponse(response);
    return { service: "render", ok: response.ok, configured: true, status: response.status, data };
  } catch (error) {
    return { service: "render", ok: false, configured: true, message: error.message };
  }
}

const results = [];

for (const check of [checkMongo, checkCloudinary, checkResend, checkRender]) {
  results.push(await check());
}

const ok = results.every((result) => result.ok || result.service === "render");

console.log(JSON.stringify({ ok, results }, null, 2));
process.exit(ok ? 0 : 1);
