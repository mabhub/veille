import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

/**
 * Generate PWA icons in the standard sizes from the SVG favicon.
 * Run once (or whenever the source SVG changes) via `npm run generate:icons`.
 */
const SIZES = [192, 512];
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SOURCE = resolve(ROOT, 'public/favicon.svg');
const OUT_DIR = resolve(ROOT, 'public/icons');

const run = async () => {
  const svg = await readFile(SOURCE);
  await mkdir(OUT_DIR, { recursive: true });

  await Promise.all(
    SIZES.map(async size => {
      const target = resolve(OUT_DIR, `icon-${size}.png`);
      await sharp(svg)
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toFile(target);
      console.log(`wrote ${target}`);
    }),
  );
};

run().catch(error => {
  console.error(error);
  process.exit(1);
});
