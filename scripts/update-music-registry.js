import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const REGISTRY_FILE = path.join(ROOT, 'src', 'content', 'registros', 'chacotero-sentimental.md');

function findIndexFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...findIndexFiles(full));
    } else if (e.isFile() && e.name === 'index.md') {
      results.push(full);
    }
  }
  return results;
}

function extractFrontmatter(text) {
  const start = text.indexOf('---');
  if (start !== 0) return null;
  const end = text.indexOf('\n---', start + 3);
  if (end === -1) return null;
  return text.slice(start + 3, end).trim();
}

function parseMusicFromFrontmatter(fm) {
  const lines = fm.split('\n');
  let inMusic = false;
  const music = { title: null, author: null, verse: null };
  let pubDate = null;
  for (const line of lines) {
    const raw = line;
    const l = raw.trim();
    if (l.startsWith('pubDate:')) {
      const v = l.split(':').slice(1).join(':').trim();
      pubDate = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    }
    if (l.startsWith('music:')) {
      inMusic = true;
      continue;
    }
    if (inMusic && !raw.startsWith(' ') && !raw.startsWith('\t')) {
      inMusic = false;
    }
    if (inMusic) {
      if (l.startsWith('title:')) {
        const v = l.split(':').slice(1).join(':').trim();
        music.title = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      } else if (l.startsWith('author:')) {
        const v = l.split(':').slice(1).join(':').trim();
        music.author = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      } else if (l.startsWith('verse:')) {
        const v = l.split(':').slice(1).join(':').trim();
        music.verse = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      }
    }
  }
  return { music, pubDate };
}

function deriveLinkFromPath(filePath, fallbackDate) {
  const m = filePath.match(/src\/content\/blog\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/index\.md$/);
  if (!m) return null;
  const [ , yyyy, mm, dd, slug ] = m;
  const href = `/blog/${yyyy}/${mm}/${dd}/${slug}`;
  const date = fallbackDate || `${yyyy}-${mm}-${dd}`;
  return { href, date };
}

function readFileUtf8(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeFileUtf8(p, data) {
  fs.writeFileSync(p, data, 'utf8');
}

function buildItemsYaml(items) {
  const lines = ['items:'];
  for (const it of items) {
    lines.push(`  - title: "${it.title}"`);
    lines.push(`    author: "${it.author}"`);
    lines.push(`    date: "${it.date}"`);
    lines.push(`    link: "${it.link}"`);
  }
  return lines.join('\n');
}

function updateRegistry(items) {
  const content = readFileUtf8(REGISTRY_FILE);
  const fmStart = content.indexOf('---');
  const fmEnd = content.indexOf('\n---', fmStart + 3);
  if (fmStart !== 0 || fmEnd === -1) {
    console.error('Frontmatter no válido en el registro.');
    process.exit(1);
  }
  const before = content.slice(0, fmStart + 3);
  const fm = content.slice(fmStart + 3, fmEnd);
  const after = content.slice(fmEnd + 4); // skip "\n---"

  const itemsPos = fm.indexOf('\nitems:');
  if (itemsPos === -1) {
    console.error('No se encontró la sección items en el registro.');
    process.exit(1);
  }
  const head = fm.slice(0, itemsPos + 1); // include the leading newline
  const newItemsYaml = buildItemsYaml(items);
  const newFrontmatter = head + newItemsYaml;
  const result = before + newFrontmatter + '\n---' + after;
  writeFileUtf8(REGISTRY_FILE, result);
}

function main() {
  const files = findIndexFiles(BLOG_DIR);
  const items = [];
  for (const f of files) {
    const text = readFileUtf8(f);
    const fm = extractFrontmatter(text);
    if (!fm) continue;
    const { music, pubDate } = parseMusicFromFrontmatter(fm);
    if (!music.title || !music.author) continue; // solo entradas con canción
    const linkInfo = deriveLinkFromPath(f, pubDate);
    if (!linkInfo) continue;
    items.push({ title: music.title, author: music.author, date: linkInfo.date, link: linkInfo.href });
  }

  // Unificar por link (evitar duplicados) y ordenar por fecha ascendente
  const uniqueByLink = new Map();
  for (const it of items) {
    uniqueByLink.set(it.link, it);
  }
  const merged = Array.from(uniqueByLink.values()).sort((a, b) => a.date.localeCompare(b.date));

  if (merged.length === 0) {
    console.log('No hay entradas con música para actualizar.');
    return;
  }
  updateRegistry(merged);
  console.log(`Actualizado registro musical con ${merged.length} entradas.`);
}

main();
