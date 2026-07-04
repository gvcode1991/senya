import { v2 as cloudinary } from "cloudinary";

import { getCloudinaryFolder } from "../config/storeConfig.js";

export function isCloudinaryConfigured() {
  return hasSplitCloudinaryCredentials() || Boolean(process.env.CLOUDINARY_URL);
}

function configureCloudinary() {
  const splitCredentials = getSplitCloudinaryCredentials();

  if (splitCredentials) {
    cloudinary.config(splitCredentials);
    return "split-env";
  }

  cloudinary.config({ secure: true });
  return "cloudinary-url";
}

function getSplitCloudinaryCredentials() {
  const cloudName = String(process.env.CLOUDINARY_CLOUD_NAME || "").trim();
  const apiKey = String(process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = String(process.env.CLOUDINARY_API_SECRET || "").trim();

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return {
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  };
}

function hasSplitCloudinaryCredentials() {
  return Boolean(getSplitCloudinaryCredentials());
}

function getSafeCloudinaryConfig(source) {
  const splitCredentials = getSplitCloudinaryCredentials();
  const apiKey = splitCredentials?.api_key || "";

  return {
    source,
    hasCloudinaryUrl: Boolean(process.env.CLOUDINARY_URL),
    cloudName: splitCredentials?.cloud_name || "from-cloudinary-url",
    apiKey: apiKey ? `...${apiKey.slice(-4)}` : "",
    folder: getCloudinaryFolder(),
  };
}

function getCloudinaryErrorMessage(error) {
  return error?.error?.message || error?.message || "Cloudinary no pudo procesar la imagen.";
}

export async function verifyCloudinaryConnection() {
  if (!isCloudinaryConfigured()) {
    return { ok: false, configured: false, reason: "missing-cloudinary" };
  }

  try {
    const source = configureCloudinary();
    const result = await cloudinary.api.ping();
    const status = result?.status || result?.message || "unknown";
    return {
      ok: status === "ok",
      configured: true,
      provider: "cloudinary",
      status,
      config: getSafeCloudinaryConfig(source),
    };
  } catch (error) {
    return {
      ok: false,
      configured: true,
      provider: "cloudinary",
      status: error.http_code || error.status || undefined,
      message: getCloudinaryErrorMessage(error),
      config: getSafeCloudinaryConfig(hasSplitCloudinaryCredentials() ? "split-env" : "cloudinary-url"),
    };
  }
}

export async function uploadProductImage(file) {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary no esta configurado.");
  }

  if (!file?.buffer) {
    throw new Error("No recibimos una imagen valida.");
  }

  configureCloudinary();

  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  let result;

  try {
    result = await cloudinary.uploader.upload(dataUri, {
      folder: getCloudinaryFolder(),
      resource_type: "image",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });
  } catch (error) {
    throw new Error(`Cloudinary no pudo subir la imagen: ${getCloudinaryErrorMessage(error)}`);
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}
