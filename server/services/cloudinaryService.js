import { v2 as cloudinary } from "cloudinary";

import { getCloudinaryFolder } from "../config/storeConfig.js";

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_URL ||
    (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
  );
}

function configureCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ secure: true });
    return;
  }

  cloudinary.config({
    cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME || "").trim(),
    api_key: String(process.env.CLOUDINARY_API_KEY || "").trim(),
    api_secret: String(process.env.CLOUDINARY_API_SECRET || "").trim(),
    secure: true,
  });
}

function getCloudinaryErrorMessage(error) {
  return error?.error?.message || error?.message || "Cloudinary no pudo procesar la imagen.";
}

export async function verifyCloudinaryConnection() {
  if (!isCloudinaryConfigured()) {
    return { ok: false, configured: false, reason: "missing-cloudinary" };
  }

  try {
    configureCloudinary();
    const result = await cloudinary.api.ping();
    const status = result?.status || result?.message || "unknown";
    return {
      ok: status === "ok",
      configured: true,
      provider: "cloudinary",
      status,
    };
  } catch (error) {
    return {
      ok: false,
      configured: true,
      provider: "cloudinary",
      status: error.http_code || error.status || undefined,
      message: getCloudinaryErrorMessage(error),
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
