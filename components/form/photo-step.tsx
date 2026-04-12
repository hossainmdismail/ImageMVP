import Image from "next/image";

import { StepShell } from "@/components/form/step-shell";

interface Props {
  previewUrl: string;
  onFileChange: (file: File | null) => void | Promise<void>;
}

export function PhotoStep({ previewUrl, onFileChange }: Props) {
  return (
    <StepShell
      eyebrow="Step 6"
      title="Add your photo."
      description="Upload a selfie or capture one on mobile. We’ll use it to personalize your ride story image."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-6 text-center transition hover:border-slate-400">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => onFileChange(event.target.files?.[0] || null)}
          />
          <span className="text-lg font-semibold text-slate-900">Upload from device</span>
          <span className="mt-2 text-sm text-slate-600">JPG, PNG, or HEIC supported</span>
        </label>
        <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-6 text-center transition hover:border-slate-400">
          <input
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={(event) => onFileChange(event.target.files?.[0] || null)}
          />
          <span className="text-lg font-semibold text-slate-900">Capture with camera</span>
          <span className="mt-2 text-sm text-slate-600">Great for quick mobile flows</span>
        </label>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/80 bg-slate-950/90 p-3 text-white">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-900">
          {previewUrl ? (
            <Image src={previewUrl} alt="Selected preview" fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-300">
              Your selected image preview appears here
            </div>
          )}
        </div>
      </div>
    </StepShell>
  );
}
