import { promises as fs } from "fs";
import path from "path";

import { ExperienceContent } from "@/types";

const CONTENT_PATH = path.join(process.cwd(), "data", "experience-content.json");

export async function readExperienceContent(): Promise<ExperienceContent> {
  const raw = await fs.readFile(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as ExperienceContent;
}

export async function writeExperienceContent(content: ExperienceContent) {
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf8");
}
