"use client";

import { useState } from "react";

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  async function updateFile(nextFile: File | null) {
    setFile(nextFile);

    if (!nextFile) {
      setPreviewUrl("");
      return;
    }

    const preview = await readFileAsDataUrl(nextFile);
    setPreviewUrl(preview);
  }

  return {
    file,
    previewUrl,
    updateFile
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
