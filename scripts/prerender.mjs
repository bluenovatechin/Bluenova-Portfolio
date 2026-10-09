// Post-build step: renders the React app to HTML and writes it into dist/index.html.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

const file = `${root}dist/index.html`;
const html = readFileSync(file, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Root element not found in dist/index.html');

// Inline the (small) stylesheet so the first paint doesn't wait for a second request.
const inlined = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/, (_, css) => {
  return `<style>${readFileSync(`${root}dist/${css}`, 'utf8')}</style>`;
});

writeFileSync(file, inlined.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
rmSync(`${root}dist-ssr`, { recursive: true, force: true });
console.log('Pre-rendered dist/index.html');
