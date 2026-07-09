import puppeteer from 'puppeteer-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = process.argv[2] || 'atelier-mobile.png';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto('http://localhost:5420/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

// Mesure la hauteur réelle d'une carte + de la grille
const metrics = await page.evaluate(() => {
  const atelier = document.getElementById('atelier');
  if (atelier) atelier.scrollIntoView();
  const cards = document.querySelector('.cards');
  const frame = document.querySelector('.card-frame');
  const direct = document.querySelector('.direct-card');
  const cs = frame ? getComputedStyle(frame) : null;
  return {
    cardsHeight: cards ? cards.getBoundingClientRect().height : null,
    frameW: frame ? frame.getBoundingClientRect().width : null,
    frameH: frame ? frame.getBoundingClientRect().height : null,
    frameAspect: cs ? cs.aspectRatio : null,
    directScale: direct ? getComputedStyle(direct).getPropertyValue('--direct-scale') : null,
    directClientH: direct ? direct.clientHeight : null,
  };
});
console.log('METRICS', JSON.stringify(metrics, null, 2));

await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: OUT });
console.log('screenshot ->', OUT);
await browser.close();
