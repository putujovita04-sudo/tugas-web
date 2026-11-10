import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const template = path.join(root, 'spots.template.html');
const output = path.join(root, 'spots-idb.html');
const assets = path.join(here, 'img');

const map = {
  __IMG_LOGIN__: 'login.jpg',
  __IMG_TEATER__: 'teater.jpg',
  __IMG_LABKOM__: 'labkom.jpg',
  __IMG_RAPAT__: 'rapat.jpg',
  __IMG_STUDIO__: 'studio.jpg',
  __IMG_TEORI__: 'teori.jpg',
  __IMG_PUSTAKA__: 'pustaka.jpg'
};

let html = fs.readFileSync(template, 'utf8');
for (const [placeholder, file] of Object.entries(map)) {
  const bytes = fs.readFileSync(path.join(assets, file));
  const data = `data:image/jpeg;base64,${bytes.toString('base64')}`;
  if (!html.includes(placeholder)) throw new Error(`Placeholder ${placeholder} tidak ditemukan`);
  html = html.split(placeholder).join(data);
}
fs.writeFileSync(output, html);
console.log(`Wrote ${path.relative(process.cwd(), output)} (${(fs.statSync(output).size / 1024 / 1024).toFixed(2)} MB)`);
