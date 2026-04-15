"use client";

import { useEffect, useState } from "react";

import { ExperienceContent } from "@/types";

export function useExperienceContent() {
  const [content, setContent] = useState<ExperienceContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/content");

        if (!response.ok) {
          throw new Error("Failed to load content");
        }

        const data = (await response.json()) as ExperienceContent;

        if (!cancelled) {
          setContent(data);
        }
      } catch (issue) {
        console.error(issue);
        if (!cancelled) {
          setError("Could not load quiz content.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading, error };
}
