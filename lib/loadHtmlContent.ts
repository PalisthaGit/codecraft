import fs from "fs";
import path from "path";

export function loadHtmlContent(section: string, slug: string): string | null {
  const filePath = path.join(process.cwd(), "content", section, `${slug}.html`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}
