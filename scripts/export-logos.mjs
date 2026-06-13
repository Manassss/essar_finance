import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const htmlPath = path.resolve('brand-logo-concepts.html');
const outputRoot = path.resolve('logos');

const conceptFolders = [
  'concept-1-premium-monogram',
  'concept-2-financial-growth-symbol',
  'concept-3-shield-finance',
  'concept-4-architectural-institutional',
  'concept-5-minimal-wordmark'
];

const variantNames = [
  'full-color.svg',
  'monochrome.svg',
  'dark-background.svg',
  'icon-only.svg'
];

const normalizeSvg = (svg) => {
  let output = svg.trim();

  output = output.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  output = output.replaceAll('class="wordmark"', 'font-family="Inter, Arial, sans-serif" font-weight="850" letter-spacing="-0.035em"');
  output = output.replaceAll('class="logo-text wordmark"', 'font-family="Inter, Arial, sans-serif" font-weight="850" letter-spacing="-0.035em" fill="#FFFFFF"');
  output = output.replaceAll('class="logo-subtext"', 'fill="#B8BDC7"');
  output = output.replaceAll('class="mono"', '');
  output = output.replaceAll('class="dark-logo"', '');

  if (!output.startsWith('<?xml')) {
    output = `<?xml version="1.0" encoding="UTF-8"?>\n${output}\n`;
  }

  return output;
};

const html = await readFile(htmlPath, 'utf8');
const conceptSections = html.split('<section class="concept">').slice(1);

if (conceptSections.length < conceptFolders.length) {
  throw new Error(`Expected ${conceptFolders.length} logo concepts, found ${conceptSections.length}.`);
}

await mkdir(outputRoot, { recursive: true });

for (let conceptIndex = 0; conceptIndex < conceptFolders.length; conceptIndex += 1) {
  const section = conceptSections[conceptIndex];
  const variantGrid = section.match(/<div class="variant-grid">([\s\S]*?)<\/div>\s*<div class="details">/);

  if (!variantGrid) {
    throw new Error(`Could not find variant grid for ${conceptFolders[conceptIndex]}.`);
  }

  const svgs = [...variantGrid[1].matchAll(/<svg[\s\S]*?<\/svg>/g)].map((match) => match[0]);

  if (svgs.length < variantNames.length) {
    throw new Error(`Expected ${variantNames.length} SVG variants for ${conceptFolders[conceptIndex]}, found ${svgs.length}.`);
  }

  const outputDir = path.join(outputRoot, conceptFolders[conceptIndex]);
  await mkdir(outputDir, { recursive: true });

  for (let variantIndex = 0; variantIndex < variantNames.length; variantIndex += 1) {
    await writeFile(
      path.join(outputDir, variantNames[variantIndex]),
      normalizeSvg(svgs[variantIndex]),
      'utf8'
    );
  }
}

console.log(`Exported ${conceptFolders.length * variantNames.length} SVG logo files to ${outputRoot}`);
