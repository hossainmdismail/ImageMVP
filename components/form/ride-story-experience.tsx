"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BasicInfoStep } from "@/components/form/basic-info-step";
import { ColorStep } from "@/components/form/color-step";
import { PhotoStep } from "@/components/form/photo-step";
import { ReviewStep } from "@/components/form/review-step";
import { SelectionStep } from "@/components/form/selection-step";
import { Button } from "@/components/ui/button";
import { GenerationPreview } from "@/components/ui/generation-preview";
import { Progress } from "@/components/ui/progress";
import { useFormState } from "@/hooks/useFormState";
import { useImageUpload } from "@/hooks/useImageUpload";
import { behaviorOptions, bikeOptions, environmentOptions } from "@/lib/constants/bikes";
import { saveRideResult } from "@/lib/utils/storage";

const TOTAL_STEPS = 7;

export function RideStoryExperience() {
  const router = useRouter();
  const { data, progress, step, update, next, back } = useFormState(TOTAL_STEPS);
  const { file, previewUrl, updateFile } = useImageUpload();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("payload", JSON.stringify({ ...data, photoDataUrl: previewUrl, photoName: file?.name }));

      if (file) {
        formData.append("photo", file);
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const result = await response.json();
      saveRideResult(result);
      router.push("/result");
    } catch (issue) {
      console.error(issue);
      setError("Your ride story could not be generated. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const stepContent = [
    <BasicInfoStep key="basic" data={data} update={update} />,
    <SelectionStep
      key="bike"
      eyebrow="Step 2"
      title="Choose the bike that matches your energy."
      description="These visual styles influence the final scene direction, mood, and visual brand of your ride story."
      options={bikeOptions}
      value={data.bikeType}
      onSelect={(value) => update("bikeType", value)}
      type="image"
    />,
    <SelectionStep
      key="environment"
      eyebrow="Step 3"
      title="Pick your ride environment."
      description="Whether you belong to the streets, hills, or coastline, the backdrop should feel like your world."
      options={environmentOptions}
      value={data.environment}
      onSelect={(value) => update("environment", value as typeof data.environment)}
    />,
    <ColorStep key="color" value={data.favoriteColor} onSelect={(value) => update("favoriteColor", value)} />,
    <SelectionStep
      key="behavior"
      eyebrow="Step 5"
      title="Your friend is late by 20 minutes. What do you do?"
      description="This quick behavior cue helps define your emotional tone and friendship dynamic inside the final composition."
      options={behaviorOptions}
      value={data.behavior}
      onSelect={(value) => update("behavior", value as typeof data.behavior)}
    />,
    <PhotoStep
      key="photo"
      previewUrl={previewUrl}
      onFileChange={async (nextFile) => {
        await updateFile(nextFile);
      }}
    />,
    <ReviewStep key="review" data={data} />
  ][step];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="space-y-6 rounded-[32px] border border-white/80 bg-slate-950 p-6 text-white shadow-glow sm:p-8">
        {!loading ? (
          <>
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
                Social-First AI Experience
              </span>
              <h1 className="max-w-sm text-4xl font-semibold tracking-tight sm:text-5xl">
                Turn a 60-second quiz into a shareable ride persona.
              </h1>
              <p className="max-w-md text-sm leading-7 text-slate-300 sm:text-base">
                Personalized scene generation, expressive storytelling, and mobile-ready sharing designed to boost brand attention.
              </p>
            </div>

            <Progress current={step} total={TOTAL_STEPS} progress={progress} />

            <div className="grid gap-3">
              {[
                "Quick 7-step flow",
                "Photo upload or camera capture",
                "AI-generated lifestyle scene",
                "Instant social caption and download"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-[28px] bg-gradient-to-br from-white/12 to-white/5 p-5">
              <div className="text-sm font-semibold text-white">Virality hook</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The result page is built for reaction screenshots, story shares, and repeat generation with a different mood.
              </p>
            </div>
          </>
        ) : null}

        {loading ? <GenerationPreview loading={loading} /> : null}
      </aside>

      <div className="space-y-5">
        {stepContent}

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        <p className="text-xs leading-6 text-slate-500">
          If AI generation is unavailable, the app will still return a preview result so the flow remains testable.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={back} disabled={step === 0 || loading}>
            Back
          </Button>
          {step === TOTAL_STEPS - 1 ? (
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating your scene..." : "Generate My Ride Story"}
            </Button>
          ) : (
            <Button onClick={next}>Continue</Button>
          )}
        </div>
      </div>
    </div>
  );
}
