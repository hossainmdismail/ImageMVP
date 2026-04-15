import { StepShell } from "@/components/form/step-shell";
import { Input } from "@/components/ui/input";

interface Props {
  colors: string[];
  value: string;
  onSelect: (value: string) => void;
}

export function ColorStep({ colors, value, onSelect }: Props) {
  return (
    <StepShell
      eyebrow="Step 4"
      title="Pick a signature color."
      description="This guides wardrobe tones, accent styling, and the overall visual personality of the generated scene."
    >
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Choose ${color}`}
            onClick={() => onSelect(color)}
            className={`h-14 rounded-2xl border transition ${value === color ? "scale-95 border-slate-900 ring-2 ring-slate-900/10" : "border-white/70"}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Or set a custom color</label>
        <div className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/85 p-3">
          <input type="color" value={value} onChange={(event) => onSelect(event.target.value)} className="h-10 w-16" />
          <Input value={value} onChange={(event) => onSelect(event.target.value)} />
        </div>
      </div>
    </StepShell>
  );
}
