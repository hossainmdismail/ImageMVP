"use client";

import { useState } from "react";

export function useImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  async function updateFiles(nextFiles: FileList | File[] | null, limit = 3) {
    const normalized = nextFiles ? Array.from(nextFiles).slice(0, limit) : [];
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
    updateFiles
  };
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read image."));
    reader.readAsDataURL(file);
  });
}
