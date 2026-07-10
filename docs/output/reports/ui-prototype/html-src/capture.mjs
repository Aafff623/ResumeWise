import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../../../../images/prototype');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { file: 'home.html', out: 'prototype-home.png', fullPage: true },
  { file: 'optimize.html', out: 'prototype-optimize.png', fullPage: true },
  { file: 'optimize-disabled.html', out: 'prototype-optimize-disabled.png', fullPage: true },
  { file: 'review.html', out: 'prototype-review.png', fullPage: true },
  { file: 'review-loading.html', out: 'prototype-review-loading.png', fullPage: true },
  { file: 'result.html', out: 'prototype-result.png', fullPage: true },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
});
const page = await context.newPage();

for (const item of pages) {
  const url = pathToFileURL(path.join(__dirname, item.file)).href;
  await page.goto(url, { waitUntil: 'networkidle' });
  // wait fonts / images
  await page.waitForTimeout(400);
  const outPath = path.join(outDir, item.out);
  await page.screenshot({ path: outPath, fullPage: item.fullPage, type: 'png' });
  console.log('saved', outPath);
}

await browser.close();
console.log('done');
