import { StepShell } from "@/components/form/step-shell";
import { RideFormData } from "@/types";

interface Props {
  data: RideFormData;
}

export function ReviewStep({ data }: Props) {
  return (
    <StepShell
      eyebrow="Step 7"
      title="Ready to generate your ride story?"
      description="We’ll combine your style, personality, environment, and photo into a social-first AI image with a shareable caption."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Stat label="Name" value={data.name || "Guest rider"} />
        <Stat label="Bike" value={data.bikeType} />
        <Stat label="Environment" value={data.environment} />
        <Stat label="Behavior" value={data.behavior} />
        <Stat label="Color" value={data.favoriteColor} color={data.favoriteColor} />
        <Stat label="Vibe" value={data.vibe || "Adventurous"} />
      </div>
    </StepShell>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-[24px] border border-white/80 bg-white/70 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 flex items-center gap-3 text-lg font-semibold capitalize text-slate-900">
        {color ? <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: color }} /> : null}
        <span>{value}</span>
      </div>
    </div>
  );
}
