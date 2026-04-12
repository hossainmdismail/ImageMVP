import Image from "next/image";

import { cn } from "@/lib/utils/cn";

interface OptionCardProps {
  title: string;
  description: string;
  active: boolean;
  image?: string;
  swatch?: string;
  onClick: () => void;
}

export function OptionCard({ title, description, active, image, swatch, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group overflow-hidden rounded-[28px] border bg-white/80 text-left shadow-sm transition duration-300",
        active
          ? "border-slate-900 ring-2 ring-slate-900/10"
          : "border-white/70 hover:-translate-y-1 hover:border-slate-200 hover:bg-white"
      )}
    >
      {image ? (
        <div className="relative h-36 overflow-hidden bg-slate-100">
          <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
      ) : swatch ? (
        <div className="h-24" style={{ backgroundColor: swatch }} />
      ) : null}
      <div className="space-y-2 p-4">
        <div className="text-base font-semibold text-slate-900">{title}</div>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </button>
  );
}
