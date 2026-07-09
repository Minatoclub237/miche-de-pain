// Télécharge les 6 images « Snacking » (carte 4) et les convertit en WebP dans public/gallery/.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('public/gallery');

const IMAGES = [
  ['https://i.ibb.co/GfRNJsHS/Baguette-sandwich-with-chicken-l-202607091648.jpg', 'snack-sandwich-poulet'],
  ['https://i.ibb.co/v46s0SzD/Baguette-sandwich-with-chicken-l-202607091644.jpg', 'snack-sandwich-poulet-pesto'],
  ['https://i.ibb.co/s4ydcPs/Baguette-sandwich-with-tuna-filling-202607091644.jpg', 'snack-sandwich-thon'],
  ['https://i.ibb.co/zVnLXzfs/Golden-cheese-friand-with-filling-202607091650.jpg', 'snack-friand-fromage'],
  ['https://i.ibb.co/dJQSqfXL/Quiche-lorraine-on-dark-slate-202607091644.jpg', 'snack-quiche-lorraine'],
  ['https://i.ibb.co/0pnmd4Sw/Lunch-set-on-dark-table-202607091644.jpg', 'snack-formule-dejeuner'],
];

async function fetchBuffer(url, tries = 4) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      if (i === tries) throw e;
      await new Promise((r) => setTimeout(r, 800 * i));
    }
  }
}

await mkdir(OUT_DIR, { recursive: true });
let total = 0;
for (const [url, name] of IMAGES) {
  const buf = await fetchBuffer(url);
  const webp = await sharp(buf)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 74 })
    .toBuffer();
  await writeFile(path.join(OUT_DIR, `${name}.webp`), webp);
  total += webp.length;
  console.log(`✓ ${name}.webp  (${(webp.length / 1024).toFixed(0)} Ko)`);
}
console.log(`\nTerminé : ${IMAGES.length} images • total ${(total / 1024).toFixed(0)} Ko`);
