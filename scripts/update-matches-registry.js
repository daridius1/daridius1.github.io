import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const REGISTRY_FILE = path.join(ROOT, 'src', 'content', 'registros', 'partidos.md');

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

function parseMatchFromFrontmatter(fm) {
  const lines = fm.split('\n');
  let inMatch = false;
  const match = { teams: null, competition: null, date: null, place: null };
  let pubDate = null;
  for (const line of lines) {
    const raw = line;
    const l = raw.trim();
    if (l.startsWith('pubDate:')) {
      const v = l.split(':').slice(1).join(':').trim();
      pubDate = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    }
    if (l.startsWith('match:')) {
      inMatch = true;
      continue;
    }
    if (inMatch && !raw.startsWith(' ') && !raw.startsWith('\t')) {
      inMatch = false;
    }
    if (inMatch) {
      if (l.startsWith('teams:')) {
        const v = l.split(':').slice(1).join(':').trim();
        match.teams = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      } else if (l.startsWith('competition:')) {
        const v = l.split(':').slice(1).join(':').trim();
        match.competition = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      } else if (l.startsWith('date:')) {
        const v = l.split(':').slice(1).join(':').trim();
        match.date = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      } else if (l.startsWith('place:')) {
        const v = l.split(':').slice(1).join(':').trim();
        match.place = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      }
    }
  }
  return { match, pubDate };
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
    lines.push(`  - teams: "${it.teams}"`);
    lines.push(`    competition: "${it.competition}"`);
    lines.push(`    date: "${it.date}"`);
    lines.push(`    place: "${it.place}"`);
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
    const { match, pubDate } = parseMatchFromFrontmatter(fm);
    if (!match.teams) continue; // solo entradas con partido
    const linkInfo = deriveLinkFromPath(f, pubDate);
    if (!linkInfo) continue;
    items.push({ 
      teams: match.teams,
      competition: match.competition || '',
      date: match.date || linkInfo.date,
      place: match.place || '',
      link: linkInfo.href 
    });
  }

  // Unificar por link (evitar duplicados) y ordenar por fecha ascendente
  const uniqueByLink = new Map();
  for (const it of items) {
    uniqueByLink.set(it.link, it);
  }
  const merged = Array.from(uniqueByLink.values()).sort((a, b) => a.date.localeCompare(b.date));

  if (merged.length === 0) {
    console.log('No hay entradas con partidos para actualizar.');
    return;
  }
  updateRegistry(merged);
  console.log(`Actualizado registro de partidos con ${merged.length} entradas.`);
}

main();
