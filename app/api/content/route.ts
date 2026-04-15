import { NextResponse } from "next/server";

import { readExperienceContent } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  try {
    const content = await readExperienceContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Failed to read experience content", error);
    return NextResponse.json({ message: "Unable to load experience content." }, { status: 500 });
  }
}
