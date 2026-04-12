import { Input } from "@/components/ui/input";
import { StepShell } from "@/components/form/step-shell";
import { RideFormData } from "@/types";

interface Props {
  data: RideFormData;
  update: <K extends keyof RideFormData>(key: K, value: RideFormData[K]) => void;
}

export function BasicInfoStep({ data, update }: Props) {
  return (
    <StepShell
      eyebrow="Step 1"
      title="Let’s frame your ride personality."
      description="A few fast details help shape the emotional tone, styling, and social chemistry of your final scene."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">First name</label>
          <Input
            placeholder="Ava"
            value={data.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Age range</label>
          <select
            className="w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            value={data.ageRange}
            onChange={(event) => update("ageRange", event.target.value)}
          >
            <option>18-24</option>
            <option>25-34</option>
            <option>35-44</option>
            <option>45+</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Your vibe in one word</label>
          <Input
            placeholder="Playful"
            value={data.vibe}
            onChange={(event) => update("vibe", event.target.value)}
          />
        </div>
      </div>
    </StepShell>
  );
}
