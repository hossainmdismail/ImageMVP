import Image from "next/image";

import { StepShell } from "@/components/form/step-shell";

interface Props {
  previewUrls: string[];
  maxFiles?: number;
  onFileChange: (files: FileList | null) => void | Promise<void>;
}

export function PhotoStep({ previewUrls, maxFiles = 3, onFileChange }: Props) {
  return (
    <StepShell
      eyebrow="Step 6"
      title="Add reference photos."
      description={`Upload up to ${maxFiles} photo${maxFiles > 1 ? 's' : ''} for stronger face preservation. Best results come from one front-facing photo${maxFiles > 1 ? ', one slight side angle, and one natural expression' : ''}.`}
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-6 text-center transition hover:border-slate-400">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => onFileChange(event.target.files)}
          />
          <span className="text-lg font-semibold text-slate-900">Upload up to {maxFiles} photo{maxFiles > 1 ? 's' : ''}</span>
          <span className="mt-2 text-sm text-slate-600">JPG, PNG, or HEIC supported</span>
        </label>
        <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-6 text-center transition hover:border-slate-400">
          <input
            type="file"
            accept="image/*"
            capture="user"
            multiple
            className="hidden"
            onChange={(event) => onFileChange(event.target.files)}
          />
          <span className="text-lg font-semibold text-slate-900">Capture from camera</span>
          <span className="mt-2 text-sm text-slate-600">Use {maxFiles > 1 ? 'multiple angles' : 'a clear photo'} if your device supports it</span>
        </label>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/80 bg-slate-950/90 p-3 text-white">
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: maxFiles }).map((_, slot) => (
            <div key={slot} className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-slate-900">
              {previewUrls[slot] ? (
                <Image src={previewUrls[slot]} alt={`Selected preview ${slot + 1}`} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center text-sm text-slate-300">
                  Photo {slot + 1} preview
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </StepShell>
  );
}
