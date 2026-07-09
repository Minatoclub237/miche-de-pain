// Télécharge les images des galeries et les convertit en WebP optimisé dans public/gallery/.
// Usage : node scripts/optimize-gallery.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('public/gallery');

const IMAGES = [
  // Carte 1 — Pains
  ['https://i.ibb.co/DPtf8sRS/Sourdough-loaf-on-wooden-board-202607091341.jpg', 'pain-levain-boule'],
  ['https://i.ibb.co/GvXPxdWC/Baguette-on-dark-linen-202607091341.jpg', 'pain-baguette'],
  ['https://i.ibb.co/BVvpnhxM/Whole-grain-loaf-cut-in-half-202607091341.jpg', 'pain-miche-meule'],
  ['https://i.ibb.co/99VzbhBr/Multi-grain-loaf-with-seeds-202607091341.jpg', 'pain-multicereales'],
  ['https://i.ibb.co/5g23K0q4/Rustic-country-loaf-on-wood-202607091341.jpg', 'pain-campagne'],
  ['https://i.ibb.co/gMfL9tL9/Sourdough-loaf-sliced-on-board-202607091341.jpg', 'pain-levain-tranches'],
  // Carte 2 — Viennoiseries
  ['https://i.ibb.co/Rk0cjL7J/Croissant-on-dark-slate-202607091346.jpg', 'vienn-croissant'],
  ['https://i.ibb.co/nMDgjkrx/Golden-pain-au-chocolat-melting-202607091346.jpg', 'vienn-pain-chocolat'],
  ['https://i.ibb.co/Rkvk2Zmt/Almond-croissant-with-cream-filling-202607091346.jpg', 'vienn-croissant-amandes'],
  ['https://i.ibb.co/qYF5wXP6/Apple-turnover-with-spiced-apple-202607091346.jpg', 'vienn-chausson-pommes'],
  ['https://i.ibb.co/zHPhQ4Fs/Pain-aux-raisins-with-pastry-202607091347.jpg', 'vienn-pain-raisins'],
  ['https://i.ibb.co/7J3XmXtT/Golden-brioche-torn-showing-strands-202607091347.jpg', 'vienn-brioche'],
  // Carte 3 — Pâtisseries
  ['https://i.ibb.co/Z6jqpW2Y/Chocolate-clair-with-chocolate-202607091351.jpg', 'patis-eclair'],
  ['https://i.ibb.co/jvBwsNyS/Apple-tart-with-apple-slices-202607091351.jpg', 'patis-tarte-pommes'],
  ['https://i.ibb.co/YCKJbkr/Vanilla-mille-feuille-with-cream-202607091351.jpg', 'patis-mille-feuille'],
  ['https://i.ibb.co/JWjLvsLY/Opera-cake-with-chocolate-glaze-202607091351.jpg', 'patis-opera'],
  ['https://i.ibb.co/hxY3qcMF/Lemon-meringue-tart-with-peaks-202607091351.jpg', 'patis-tarte-citron'],
  ['https://i.ibb.co/7dJkqmyN/Paris-Brest-choux-ring-hazelnut-202607091352.jpg', 'patis-paris-brest'],
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
  const outPath = path.join(OUT_DIR, `${name}.webp`);
  await writeFile(outPath, webp);
  const kb = (webp.length / 1024).toFixed(0);
  total += webp.length;
  console.log(`✓ ${name}.webp  (${kb} Ko)`);
}
console.log(`\nTerminé : ${IMAGES.length} images • total ${(total / 1024 / 1024).toFixed(2)} Mo`);
