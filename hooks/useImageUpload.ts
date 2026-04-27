"use client";

import { useState } from "react";

import imageCompression from "browser-image-compression";

export function useImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  async function updateFiles(nextFiles: FileList | File[] | null, limit = 3) {
    let normalized = nextFiles ? Array.from(nextFiles).slice(0, limit) : [];

    if (normalized.length > 0) {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        initialQuality: 0.85
      };

      normalized = await Promise.all(
        normalized.map(async (file) => {
          try {
            return await imageCompression(file, options);
          } catch (error) {
            console.error("Compression failed for", file.name, error);
            return file;
          }
        })
      );
    }

    setFiles(normalized);

    if (!normalized.length) {
      setPreviewUrls([]);
      return;
    }

    const previews = await Promise.all(normalized.map((file) => readFileAsDataUrl(file)));
    setPreviewUrls(previews);
  }

  return {
    files,
    previewUrls,
    updateFiles,
    restoreFromDataUrls
  };

  async function restoreFromDataUrls(urls: string[]) {
    setPreviewUrls(urls);

    if (!urls.length) {
      setFiles([]);
      return;
    }

    const restoredFiles = await Promise.all(
      urls.map((url, index) => dataUrlToFile(url, `restored-photo-${index + 1}.png`))
    );
    setFiles(restoredFiles);
  }
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read image."));
    reader.readAsDataURL(file);
  });
}

async function dataUrlToFile(dataUrl: string, filename: string) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}
