export type RideEnvironment =
  | "city"
  | "village"
  | "mountain"
  | "coastal"
  | "desert";

export type BehaviorChoice = "leave" | "stay" | "scold";

export interface BasicInfo {
  name: string;
  ageRange: string;
  vibe: string;
}

export interface RideFormData extends BasicInfo {
  bikeType: string;
  environment: RideEnvironment;
  favoriteColor: string;
  behavior: BehaviorChoice;
  photoDataUrl?: string;
  photoName?: string;
}

export interface DerivedRideProfile {
  personalityTraits: string[];
  emotionalTone: string;
  socialDynamic: string;
  sceneDirection: string;
}

export interface RidePromptBundle extends DerivedRideProfile {
  imagePrompt: string;
  storyPrompt: string;
  summarySeed: string;
  captionSeed: string;
}

export interface RideGenerationResponse {
  imageUrl: string;
  summary: string;
  caption: string;
  prompt: string;
  profile: DerivedRideProfile;
  providerError?: string | null;
}

export interface BikeOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface SelectOption {
  id: string;
  label: string;
  description: string;
}
