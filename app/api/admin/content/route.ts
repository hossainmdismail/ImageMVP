import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readExperienceContent, writeExperienceContent } from "@/lib/content";
import { ExperienceContent } from "@/types";

export const runtime = "nodejs";

function isValidContent(content: ExperienceContent) {
  return Boolean(
    content?.hero?.title &&
      content?.bikes?.length &&
      content?.environments?.length &&
      content?.colors?.length &&
      content?.behaviorQuestion?.options?.length
  );
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const content = await readExperienceContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as ExperienceContent;

    if (!isValidContent(body)) {
      return NextResponse.json({ message: "Invalid content payload." }, { status: 400 });
    }

    await writeExperienceContent(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update content", error);
    return NextResponse.json({ message: "Could not save content." }, { status: 500 });
  }
}
