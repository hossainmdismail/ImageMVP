import { RideFormData, RidePromptBundle } from "@/types";

const environmentDirection: Record<RideFormData["environment"], string> = {
  city: "neon-lit avenues, dynamic architecture, and fashionable street framing",
  village: "open roads, soft daylight, local texture, and grounded warmth",
  mountain: "dramatic elevation, sweeping curves, and cinematic air",
  coastal: "golden shoreline light, salty breeze, and expansive horizon lines",
  desert: "sun-baked openness, sculptural shadows, and premium editorial contrast"
};

const behaviorMap = {
  leave: {
    traits: ["confident", "self-directed", "fearlessly stylish"],
    emotionalTone: "assertive and magnetic",
    socialDynamic: "two close friends with playful respect for each other's independence"
  },
  stay: {
    traits: ["calm", "loyal", "effortlessly grounded"],
    emotionalTone: "warm and trustworthy",
    socialDynamic: "two close friends with a deeply supportive, easygoing connection"
  },
  scold: {
    traits: ["expressive", "passionate", "big-hearted"],
    emotionalTone: "lively and emotionally vivid",
    socialDynamic: "two close friends with teasing chemistry and visible affection"
  }
} as const;

export function buildRidePromptBundle(data: RideFormData): RidePromptBundle {
  const mapped = behaviorMap[data.behavior];
  const personalityTraits = [data.vibe || "adventurous", ...mapped.traits];
  const sceneDirection = environmentDirection[data.environment];

  return {
    personalityTraits,
    emotionalTone: mapped.emotionalTone,
    socialDynamic: mapped.socialDynamic,
    sceneDirection,
    imagePrompt:
      `Cinematic lifestyle scene of ${data.name || "a stylish"} rider with ${mapped.socialDynamic}, ` +
      `riding a ${data.bikeType} motorcycle in a ${data.environment} setting with ${sceneDirection}. ` +
      `Wardrobe uses tones of ${data.favoriteColor}. Mood feels ${mapped.emotionalTone}. ` +
      `Natural lighting, premium composition, expressive body language, authentic friendship energy, ` +
      `social-media-ready, emotionally engaging, polished editorial realism.`,
    storyPrompt:
      `Create a concise JSON object with keys "summary" and "caption". The rider is ${data.name || "the user"}, ` +
      `with traits ${personalityTraits.join(", ")}. The emotional tone is ${mapped.emotionalTone}. ` +
      `The friend dynamic is ${mapped.socialDynamic}. The scene is a ${data.environment} ride on a ${data.bikeType}. ` +
      `Favorite color: ${data.favoriteColor}. Keep the summary under 45 words and the caption under 18 words.`,
    summarySeed:
      `${data.name || "You"} ride like someone ${personalityTraits.join(", ")}, turning every ${data.environment} route into a shared memory.`,
    captionSeed: "Just found my ride personality. #RideStory #MyBikeMood"
  };
}

export function fallbackStoryText(data: RideFormData, bundle: RidePromptBundle) {
  return {
    summary:
      `${data.name || "You"} come across as ${bundle.personalityTraits.slice(0, 3).join(", ")}, with a ${bundle.emotionalTone} presence that makes every ${data.environment} ride feel like a close-friend movie scene.`,
    caption: "Just found my ride personality. #RideStory #MyBikeMood"
  };
}
