import { BikeOption, SelectOption } from "@/types";

export const bikeOptions: BikeOption[] = [
  {
    id: "neo-cafe",
    name: "Neo Cafe",
    description: "Stylish, urban, and made for attention-grabbing city loops.",
    image: "/bikes/neo-cafe.svg"
  },
  {
    id: "trail-blazer",
    name: "Trail Blazer",
    description: "An agile machine for scenic turns and adventurous detours.",
    image: "/bikes/trail-blazer.svg"
  },
  {
    id: "coast-cruiser",
    name: "Coast Cruiser",
    description: "Relaxed, smooth, and ideal for warm air and golden hour rides.",
    image: "/bikes/coast-cruiser.svg"
  },
  {
    id: "summit-r",
    name: "Summit R",
    description: "Powerful, bold, and built for dramatic landscape moments.",
    image: "/bikes/summit-r.svg"
  }
];

export const environmentOptions: SelectOption[] = [
  {
    id: "city",
    label: "City Ride",
    description: "Fast pace, lights, and a stylish street-energy backdrop."
  },
  {
    id: "village",
    label: "Village Ride",
    description: "Warm, grounded, and rich with everyday charm."
  },
  {
    id: "mountain",
    label: "Mountain Ride",
    description: "Epic views, elevation, and expressive freedom."
  },
  {
    id: "coastal",
    label: "Coastal Ride",
    description: "Breezy, cinematic, and full of horizon energy."
  },
  {
    id: "desert",
    label: "Desert Ride",
    description: "High contrast, fearless, and fashion-forward."
  }
];

export const behaviorOptions: SelectOption[] = [
  {
    id: "leave",
    label: "Leave",
    description: "Bold and independent. Your time matters."
  },
  {
    id: "stay",
    label: "Stay",
    description: "Calm and loyal. You protect the bond."
  },
  {
    id: "scold",
    label: "Wait & scold",
    description: "Expressive and emotional. You care, loudly."
  }
];

export const colorPresets = [
  "#FF6B35",
  "#2563EB",
  "#22C55E",
  "#F59E0B",
  "#D946EF",
  "#0F172A",
  "#F43F5E",
  "#14B8A6"
];
