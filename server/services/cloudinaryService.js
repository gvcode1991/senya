import { v2 as cloudinary } from "cloudinary";

import { getCloudinaryFolder } from "../config/storeConfig.js";

export function isCloudinaryConfigured() {
  return hasSplitCloudinaryCredentials() || Boolean(process.env.CLOUDINARY_URL) || hasUnsignedUploadConfig();
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
  const cloudName = normalizeCredential(process.env.CLOUDINARY_CLOUD_NAME);
  const apiKey = normalizeCredential(process.env.CLOUDINARY_API_KEY);
  const apiSecret = normalizeCredential(process.env.CLOUDINARY_API_SECRET);

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

function normalizeCredential(value) {
  return String(value || "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/[\u200B-\u200D\uFEFF\r\n\t ]/g, "");
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
    hasUploadPreset: hasUnsignedUploadConfig(),
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

  let result;

  try {
    result = await uploadImageBuffer(file.buffer, {
      folder: getCloudinaryFolder(),
      resource_type: "image",
    });
  } catch (error) {
    if (hasUnsignedUploadConfig()) {
      return uploadUnsignedProductImage(file, getCloudinaryErrorMessage(error));
    }

    throw new Error(`Cloudinary no pudo subir la imagen: ${getCloudinaryErrorMessage(error)}`);
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

async function uploadUnsignedProductImage(file, signedUploadError) {
  const cloudName = getUnsignedCloudName();
  const uploadPreset = normalizeCredential(process.env.CLOUDINARY_UPLOAD_PRESET);
  const formData = new FormData();
  const imageBlob = new Blob([file.buffer], { type: file.mimetype });

  formData.append("file", imageBlob, file.originalname || "product-image");
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", getCloudinaryFolder());

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(20000),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const unsignedError = data.error?.message || data.message || "Cloudinary no pudo subir la imagen con preset unsigned.";
    throw new Error(`Cloudinary no pudo subir la imagen. Firma: ${signedUploadError}. Preset unsigned: ${unsignedError}`);
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    provider: "cloudinary-unsigned",
    signedUploadError,
    width: data.width,
    height: data.height,
  };
}

function hasUnsignedUploadConfig() {
  return Boolean(getUnsignedCloudName() && normalizeCredential(process.env.CLOUDINARY_UPLOAD_PRESET));
}

function getUnsignedCloudName() {
  return normalizeCredential(process.env.CLOUDINARY_CLOUD_NAME) || getCloudNameFromCloudinaryUrl();
}

function getCloudNameFromCloudinaryUrl() {
  const cloudinaryUrl = String(process.env.CLOUDINARY_URL || "");
  const match = cloudinaryUrl.match(/@([^/?#]+)/);
  return match ? normalizeCredential(match[1]) : "";
}

function uploadImageBuffer(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });

    stream.end(buffer);
  });
}
