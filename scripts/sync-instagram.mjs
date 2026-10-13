// Downloads the posts listed in `instagramPosts` (src/data/site.js) from Instagram's public
// embed pages: the full-size image (saved as WebP in two sizes) and the caption.
// Run with `npm run instagram`. Already-downloaded posts are skipped; pass --force to refetch.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { instagramPosts } from '../src/data/site.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = `${root}public/instagram`;
const dataFile = `${root}src/data/instagram.json`;
const force = process.argv.includes('--force');
// A short user agent gets the server-rendered embed (a full browser one gets a JS-only page).
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/141.0';

const decode = (s) =>
  s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

mkdirSync(outDir, { recursive: true });
const previous = existsSync(dataFile) ? JSON.parse(readFileSync(dataFile, 'utf8')) : [];
const out = [];

for (const url of instagramPosts) {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(p|reel|tv)\/([\w-]+)/);
  if (!m) {
    console.warn(`Skipping, not a post link: ${url}`);
    continue;
  }
  const [, kind, code] = m;
  const known = previous.find((p) => p.code === code);
  if (known && !force && existsSync(`${outDir}/${code}.webp`)) {
    out.push(known);
    continue;
  }

  const res = await fetch(`https://www.instagram.com/${kind}/${code}/embed/captioned/`, { headers: { 'User-Agent': UA } });
  const html = await res.text();
  const tag = html.match(/<img[^>]*class="EmbeddedMediaImage"[^>]*>/)?.[0];
  if (!tag) {
    console.warn(`No image found for ${url} (status ${res.status}); keeping the old entry if any.`);
    if (known) out.push(known);
    continue;
  }
  // pick the 1080px rendition from the srcset (falls back to the largest)
  const set = decode(tag.match(/srcset="([^"]+)"/)?.[1] ?? '')
    .split(',')
    .map((c) => c.trim().split(/\s+/))
    .map(([src, w]) => ({ src, w: parseInt(w, 10) || 0 }))
    .sort((a, b) => a.w - b.w);
  const pick = set.find((c) => c.w >= 1080) ?? set.at(-1) ?? { src: decode(tag.match(/src="([^"]+)"/)[1]) };
  const img = Buffer.from(await (await fetch(pick.src, { headers: { 'User-Agent': UA } })).arrayBuffer());

  const caption = decode(
    (html.match(/<div class="Caption">([\s\S]*?)<\/div>/)?.[1] ?? '').replace(/<a class="CaptionUsername"[\s\S]*?<\/a>/, ''),
  );

  const base = sharp(img).rotate();
  const meta = await base.metadata();
  await base.clone().resize({ width: 1080, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`${outDir}/${code}.webp`);
  await base.clone().resize({ width: 480 }).webp({ quality: 80 }).toFile(`${outDir}/${code}-480.webp`);

  out.push({
    code,
    url: `https://www.instagram.com/${kind}/${code}/`,
    type: kind === 'reel' ? 'Reel' : 'Post',
    caption,
    image: `instagram/${code}.webp`,
    thumb: `instagram/${code}-480.webp`,
    width: Math.min(meta.width, 1080),
    height: Math.round((Math.min(meta.width, 1080) / meta.width) * meta.height),
  });
  console.log(`✓ ${code}`);
}

writeFileSync(dataFile, `${JSON.stringify(out, null, 2)}\n`);
console.log(`Saved ${out.length} posts to src/data/instagram.json`);
