// Convert PNG masters in static/images/original/ into the delivery chain:
//   <name>-<width>.avif  (quality 50)
//   <name>-<width>.webp  (quality 80)
//   <name>-<width>.jpg   (quality 84) + <name>-800.jpg fallback
// Widths: 480 / 800 / 1200 / 1600. Run: npm run images
// Transparent PNG masters keep their alpha in AVIF/WebP; JPG is skipped
// for them only if the filename ends with -transparent.
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = new URL('../static/images/original/', import.meta.url);
const OUT = new URL('../static/images/', import.meta.url);
const WIDTHS = [480, 800, 1200, 1600];

const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith('.png'));
if (files.length === 0) {
	console.log('No PNG masters in static/images/original/ — nothing to convert.');
	process.exit(0);
}
await mkdir(OUT, { recursive: true });

for (const file of files) {
	const { name } = parse(file);
	const transparent = name.endsWith('-transparent');
	const input = join(SRC.pathname, file);
	for (const width of WIDTHS) {
		const base = sharp(input).resize(width, null, { withoutEnlargement: true });
		await base.clone().avif({ quality: 50, effort: 2 }).toFile(join(OUT.pathname, `${name}-${width}.avif`));
		await base.clone().webp({ quality: 80 }).toFile(join(OUT.pathname, `${name}-${width}.webp`));
		if (!transparent) {
			await base
				.clone()
				.flatten({ background: '#fdf9f4' })
				.jpeg({ quality: 84 })
				.toFile(join(OUT.pathname, `${name}-${width}.jpg`));
		}
	}
	console.log(`✓ ${name}: avif + webp${transparent ? '' : ' + jpg'} @ ${WIDTHS.join('/')}`);
}
console.log(`Done — ${files.length} master(s) converted.`);
