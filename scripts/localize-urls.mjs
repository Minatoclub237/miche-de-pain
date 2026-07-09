// Remplace les URLs ibb.co par les chemins locaux /gallery/*.webp dans les fichiers de données.
import { readFile, writeFile } from 'node:fs/promises';

const MAP = {
  'https://i.ibb.co/DPtf8sRS/Sourdough-loaf-on-wooden-board-202607091341.jpg': '/gallery/pain-levain-boule.webp',
  'https://i.ibb.co/GvXPxdWC/Baguette-on-dark-linen-202607091341.jpg': '/gallery/pain-baguette.webp',
  'https://i.ibb.co/BVvpnhxM/Whole-grain-loaf-cut-in-half-202607091341.jpg': '/gallery/pain-miche-meule.webp',
  'https://i.ibb.co/99VzbhBr/Multi-grain-loaf-with-seeds-202607091341.jpg': '/gallery/pain-multicereales.webp',
  'https://i.ibb.co/5g23K0q4/Rustic-country-loaf-on-wood-202607091341.jpg': '/gallery/pain-campagne.webp',
  'https://i.ibb.co/gMfL9tL9/Sourdough-loaf-sliced-on-board-202607091341.jpg': '/gallery/pain-levain-tranches.webp',
  'https://i.ibb.co/Rk0cjL7J/Croissant-on-dark-slate-202607091346.jpg': '/gallery/vienn-croissant.webp',
  'https://i.ibb.co/nMDgjkrx/Golden-pain-au-chocolat-melting-202607091346.jpg': '/gallery/vienn-pain-chocolat.webp',
  'https://i.ibb.co/Rkvk2Zmt/Almond-croissant-with-cream-filling-202607091346.jpg': '/gallery/vienn-croissant-amandes.webp',
  'https://i.ibb.co/qYF5wXP6/Apple-turnover-with-spiced-apple-202607091346.jpg': '/gallery/vienn-chausson-pommes.webp',
  'https://i.ibb.co/zHPhQ4Fs/Pain-aux-raisins-with-pastry-202607091347.jpg': '/gallery/vienn-pain-raisins.webp',
  'https://i.ibb.co/7J3XmXtT/Golden-brioche-torn-showing-strands-202607091347.jpg': '/gallery/vienn-brioche.webp',
  'https://i.ibb.co/Z6jqpW2Y/Chocolate-clair-with-chocolate-202607091351.jpg': '/gallery/patis-eclair.webp',
  'https://i.ibb.co/jvBwsNyS/Apple-tart-with-apple-slices-202607091351.jpg': '/gallery/patis-tarte-pommes.webp',
  'https://i.ibb.co/YCKJbkr/Vanilla-mille-feuille-with-cream-202607091351.jpg': '/gallery/patis-mille-feuille.webp',
  'https://i.ibb.co/JWjLvsLY/Opera-cake-with-chocolate-glaze-202607091351.jpg': '/gallery/patis-opera.webp',
  'https://i.ibb.co/hxY3qcMF/Lemon-meringue-tart-with-peaks-202607091351.jpg': '/gallery/patis-tarte-citron.webp',
  'https://i.ibb.co/7dJkqmyN/Paris-Brest-choux-ring-hazelnut-202607091352.jpg': '/gallery/patis-paris-brest.webp',
};

const FILES = ['src/gallery/botanicalData.ts', 'src/gallery/galleryConfigs.ts'];

for (const file of FILES) {
  let content = await readFile(file, 'utf8');
  let count = 0;
  for (const [from, to] of Object.entries(MAP)) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      count++;
    }
  }
  await writeFile(file, content, 'utf8');
  console.log(`${file} : ${count} URL(s) remplacée(s)`);
}
