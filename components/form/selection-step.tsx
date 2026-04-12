import { StepShell } from "@/components/form/step-shell";
import { OptionCard } from "@/components/ui/option-card";
import { BikeOption, SelectOption } from "@/types";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  options: Array<SelectOption | BikeOption>;
  value: string;
  onSelect: (value: string) => void;
  type?: "image" | "default" | "color";
}

export function SelectionStep({
  eyebrow,
  title,
  description,
  options,
  value,
  onSelect,
  type = "default"
}: Props) {
  return (
    <StepShell eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            title={"name" in option ? option.name : option.label}
            description={option.description}
            active={value === ("name" in option ? option.name : option.id)}
            image={type === "image" ? ("image" in option ? option.image : undefined) : undefined}
            swatch={type === "color" ? option.id : undefined}
            onClick={() => onSelect("name" in option ? option.name : option.id)}
          />
        ))}
      </div>
    </StepShell>
  );
}
