import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { BLOG_ARTICLES } from "../src/content/blog/catalog.ts";

const outputRoot = join(process.cwd(), "public", "assets", "media", "blog");
const cardWidth = 1200;
const cardHeight = 630;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapTitle(value: string, maxCharacters = 31): string[] {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && candidate.length > maxCharacters) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function renderCard(article: (typeof BLOG_ARTICLES)[number]): string {
  const titleLines = wrapTitle(article.title);
  const fontSize = titleLines.length <= 2 ? 64 : titleLines.length === 3 ? 55 : 47;
  const lineHeight = Math.round(fontSize * 1.18);
  const totalLineHeight = (titleLines.length - 1) * lineHeight;
  const firstBaseline = Math.round(346 - totalLineHeight / 2 + fontSize * 0.36);
  const localeLabel = article.locale === "es" ? "ESPAÑOL · GUÍA" : "ENGLISH · GUIDE";
  const category = article.category.toLocaleUpperCase(
    article.locale === "es" ? "es-ES" : "en-US",
  );
  const renderedTitle = titleLines
    .map((line, index) => {
      const y = firstBaseline + index * lineHeight;
      return `<text x="70" y="${y}" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" fill="#172c32">${escapeXml(line)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}">
  <rect width="${cardWidth}" height="${cardHeight}" fill="#f8f6f0" />
  <g transform="translate(60.5 50.55) scale(.63)">
    <path d="M18 15h17l15 38 15-38h17L57 85H43L18 15Z" fill="#174c3e" />
    <path d="m56.4 51 15.6-31h8L63.4 61Z" fill="#b85f43" />
  </g>
  <text x="142" y="94" font-family="Georgia, 'Times New Roman', serif" font-size="29" fill="#172c32">Valls Solutions</text>
  <path d="M70 150H1130" stroke="#dedfd7" />
  <rect x="70" y="188" width="29" height="3" fill="#b85f43" />
  <text x="70" y="222" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2.2" fill="#405458">${escapeXml(category)}</text>
  ${renderedTitle}
  <rect x="0" y="552" width="${cardWidth}" height="78" fill="#17493f" />
  <text x="70" y="602" font-family="Arial, sans-serif" font-size="23" fill="#ffffff">vallssolutions.com</text>
  <text x="1130" y="602" text-anchor="end" font-family="Arial, sans-serif" font-size="21" fill="#ffffff">${localeLabel}</text>
</svg>`;
}

async function generateCards(): Promise<void> {
  const destinations = new Set<string>();

  for (const article of BLOG_ARTICLES) {
    const relativePath = join(article.locale, `${article.slug}.png`);
    if (destinations.has(relativePath)) {
      throw new Error(`Duplicate social card path: ${relativePath}`);
    }
    destinations.add(relativePath);

    const filePath = join(outputRoot, relativePath);
    await mkdir(dirname(filePath), { recursive: true });
    await sharp(Buffer.from(renderCard(article)))
      .png({ compressionLevel: 9 })
      .toFile(filePath);

    const metadata = await sharp(filePath).metadata();
    if (metadata.width !== cardWidth || metadata.height !== cardHeight) {
      throw new Error(`Unexpected card dimensions for ${relativePath}`);
    }
  }

  console.log(`Generated ${destinations.size} blog social cards at 1200×630.`);
}

await generateCards();
