import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const txt = fs.readFileSync(
  path.join(root, "XR_Summits_Legal_Policy_Pack_2026.txt"),
  "utf8",
);

function collectImplText() {
  const dir = path.join(root, "src/core/content/legal");
  let text = "";
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".ts") || file === "types.ts" || file === "index.ts")
      continue;
    text += fs.readFileSync(path.join(dir, file), "utf8");
  }
  const footer = fs.readFileSync(
    path.join(root, "src/components/layout/Footer.tsx"),
    "utf8",
  );
  return (text + footer).replace(/\s+/g, " ").toLowerCase();
}

const impl = collectImplText();

const sentences = txt
  .replace(/\r/g, "")
  .split(/\n+/)
  .map((l) => l.trim())
  .filter(Boolean)
  .filter(
    (l) =>
      !/^XR SUMMITS SDN BHD$/i.test(l) &&
      !/^Legal & Policy Pack · 2026$/i.test(l) &&
      !/^Confidential — Draft for review$/i.test(l) &&
      !/^register@xr-summits\.com$/i.test(l) &&
      !/^Page \d+ of \d+$/i.test(l) &&
      !/^\f/.test(l),
  );

const missing = [];
for (const line of sentences) {
  if (line.length < 40) continue;
  const norm = line.replace(/\s+/g, " ").toLowerCase();
  if (!impl.includes(norm.slice(0, Math.min(60, norm.length)))) {
    missing.push(line.slice(0, 120));
  }
}

console.log(
  `Checked ${sentences.length} lines, ${missing.length} potentially missing:`,
);
missing.slice(0, 30).forEach((m) => console.log("-", m));
