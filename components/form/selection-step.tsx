"use client";

import { useMemo, useState } from "react";

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

const BIKE_PAGE_SIZE = 8;

export function SelectionStep({
  eyebrow,
  title,
  description,
  options,
  value,
  onSelect,
  type = "default"
}: Props) {
  const isImageGrid = type === "image";
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(options.length / BIKE_PAGE_SIZE));
  const visibleOptions = useMemo(() => {
    if (!isImageGrid) {
      return options;
    }

    return options.slice(page * BIKE_PAGE_SIZE, page * BIKE_PAGE_SIZE + BIKE_PAGE_SIZE);
  }, [isImageGrid, options, page]);

  if (!isImageGrid) {
    return (
      <StepShell eyebrow={eyebrow} title={title} description={description}>
        <div className="grid gap-3 sm:grid-cols-2">
          {visibleOptions.map((option) => (
            <OptionCard
              key={option.id}
              title={"name" in option ? option.name : option.label}
              description={option.description}
              active={value === ("name" in option ? option.name : option.id)}
              swatch={type === "color" ? option.id : undefined}
              onClick={() => onSelect("name" in option ? option.name : option.id)}
            />
          ))}
        </div>
      </StepShell>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <div className="mb-10 text-center">
        <h2 className="text-[2rem] font-black leading-tight tracking-[-0.045em] text-white md:text-[2.2rem]">
          {title}
        </h2>
        <p className="hide mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50 md:text-md">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:gap-4 lg:grid-cols-4">
        {visibleOptions.map((option) => (
          <OptionCard
            key={option.id}
            title={"name" in option ? option.name : option.label}
            description={option.description}
            active={value === ("name" in option ? option.name : option.id)}
            image={option.image}
            compact
            onClick={() => onSelect("name" in option ? option.name : option.id)}
          />
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-7 flex items-center justify-center gap-7">
          <button
            type="button"
            aria-label="Previous bike page"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            className="text-4xl font-light leading-none text-white/76 transition hover:text-white disabled:opacity-30"
            disabled={page === 0}
          >
            ‹
          </button>
          <div className="flex items-center gap-4">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to bike page ${index + 1}`}
                onClick={() => setPage(index)}
                className={`h-3 w-3 rounded-full transition ${
                  page === index ? "bg-[#8f96ff]" : "bg-white/10 hover:bg-white/25"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next bike page"
            onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
            className="text-4xl font-light leading-none text-white/76 transition hover:text-white disabled:opacity-30"
            disabled={page === pageCount - 1}
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
