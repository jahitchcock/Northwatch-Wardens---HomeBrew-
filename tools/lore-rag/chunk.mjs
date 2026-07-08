import matter from 'gray-matter';

// Split markdown into heading-scoped chunks. Each chunk carries a heading
// trail (h1 > h2 …) and the file's frontmatter as metadata. Long sections
// are soft-split on paragraph boundaries near MAX_CHARS.
const MAX_CHARS = 2800;

export function chunkMarkdown(raw, sourcePath) {
  const { data: fm, content } = matter(raw);
  const metadata = {
    name: fm.name ?? null,
    title: fm.title ?? null,
    type: fm.type ?? null,
  };
  const lines = content.split(/\r?\n/);
  const trail = [];
  const sections = [];
  let buf = [];

  const flush = () => {
    const text = buf.join('\n').trim();
    if (text) {
      sections.push({ heading: trail.map(t => t.text).join(' > ') || null, text });
    }
    buf = [];
  };

  for (const line of lines) {
    const m = /^(#{1,6})\s+(.*)$/.exec(line);
    if (m) {
      flush();
      const level = m[1].length;
      while (trail.length && trail[trail.length - 1].level >= level) trail.pop();
      trail.push({ level, text: m[2].trim() });
    } else {
      buf.push(line);
    }
  }
  flush();

  const out = [];
  for (const s of sections) {
    if (s.text.length <= MAX_CHARS) { out.push(s); continue; }
    const paras = s.text.split(/\n{2,}/);
    let cur = '';
    for (const p of paras) {
      if (cur && (cur.length + p.length) > MAX_CHARS) {
        out.push({ heading: s.heading, text: cur.trim() });
        cur = '';
      }
      cur += (cur ? '\n\n' : '') + p;
    }
    if (cur.trim()) out.push({ heading: s.heading, text: cur.trim() });
  }

  return out.map(s => ({
    source_path: sourcePath.replace(/\\/g, '/'),
    heading: s.heading,
    chunk_text: s.heading ? `${s.heading}\n\n${s.text}` : s.text,
    metadata,
  }));
}
