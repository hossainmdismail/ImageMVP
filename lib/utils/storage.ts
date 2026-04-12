import { RideGenerationResponse } from "@/types";

const STORAGE_KEY = "ride-story-result";

export function saveRideResult(result: RideGenerationResponse) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function loadRideResult(): RideGenerationResponse | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as RideGenerationResponse;
  } catch {
    return null;
  }
}
