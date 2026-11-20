import { XMLParser } from 'fast-xml-parser';

export interface Article {
  title: string;
  link: string;
  date: string; // ISO
  source: string;
  summary: string;
}

export const sources = [
  { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/feed/rss/', topic: 'UX research' },
  { name: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/', topic: 'UX & UI' },
  { name: 'UX Collective', url: 'https://uxdesign.cc/feed', topic: 'UX & product' },
  { name: 'UX Planet', url: 'https://uxplanet.org/feed', topic: 'UI & UX' },
  { name: 'A List Apart', url: 'https://alistapart.com/main/feed/', topic: 'Web design' },
  { name: 'UXmatters', url: 'https://www.uxmatters.com/index.xml', topic: 'UX practice' },
  { name: 'UX Magazine', url: 'https://uxmag.com/feed', topic: 'UX strategy' },
];

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@', textNodeName: '#text' });

const text = (v: unknown): string => {
  if (v == null) return '';
  if (typeof v === 'string' || typeof v === 'number') return String(v);
  if (Array.isArray(v)) return text(v[0]);
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>;
    return text(o['#text'] ?? o['@href'] ?? '');
  }
  return '';
};

const decode = (s: string) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#8217;/g, '’').replace(/&#8216;/g, '‘')
    .replace(/&#822[01];/g, '"').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&#8230;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const clean = (html: string, max = 180) => {
  const t = decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max).replace(/\s+\S*$/, '') + '…' : t;
};

async function fetchSource(src: (typeof sources)[number]): Promise<Article[]> {
  const res = await fetch(src.url, {
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; PixelpunkBot/1.0)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const xml = parser.parse(await res.text());
  const raw = xml?.rss?.channel?.item ?? xml?.feed?.entry ?? xml?.['rdf:RDF']?.item ?? [];
  const items = Array.isArray(raw) ? raw : [raw];
  return items.slice(0, 12).flatMap((it: Record<string, unknown>) => {
    const linkField = it.link;
    const link = Array.isArray(linkField)
      ? text((linkField as Record<string, unknown>[]).find((l) => l['@rel'] === 'alternate') ?? linkField[0])
      : text(linkField);
    const title = decode(text(it.title)).trim();
    const d = new Date(text(it.pubDate ?? it.published ?? it.updated ?? it['dc:date']));
    if (!title || !/^https?:\/\//.test(link)) return [];
    return [{
      title,
      link,
      date: isNaN(d.getTime()) ? '' : d.toISOString(),
      source: src.name,
      summary: clean(text(it.description ?? it.summary ?? it['content:encoded'] ?? it.content)),
    }];
  });
}

/** Fetches every source at build time. A failing source is skipped, never fatal. */
let cached: Promise<{ articles: Article[]; failed: string[] }> | undefined;
export function getArticles() {
  return (cached ??= loadArticles());
}

async function loadArticles(): Promise<{ articles: Article[]; failed: string[] }> {
  const results = await Promise.allSettled(sources.map(fetchSource));
  const failed: string[] = [];
  const seen = new Set<string>();
  const articles = results.flatMap((r, i) => {
    if (r.status === 'rejected') { failed.push(sources[i].name); console.warn(`[feeds] ${sources[i].name} failed: ${r.reason}`); return []; }
    return r.value;
  }).filter((a) => !seen.has(a.link) && seen.add(a.link))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return { articles, failed };
}
