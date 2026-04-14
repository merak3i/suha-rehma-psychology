/**
 * fetch-substack.mjs
 * Fetches the latest posts from the Substack RSS feed and writes them to
 * src/data/substack-posts.json. Run manually or via GitHub Actions monthly cron.
 *
 * Usage: node scripts/fetch-substack.mjs
 * Requires: Node 18+ (native fetch)
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const RSS_URL = 'https://neurodiversetherapist.substack.com/feed';
const OUTPUT_PATH = join(__dirname, '../src/data/substack-posts.json');
const MAX_POSTS = 10;

/** Extract content from a CDATA-wrapped or plain XML tag. */
function extractTag(xml, tag) {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const plainRe  = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = xml.match(cdataRe) || xml.match(plainRe);
  return m ? m[1].trim() : '';
}

/** Decode common HTML entities in a string. */
function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'")
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8211;/g, '\u2013');
}

/** Strip HTML tags from a string. */
function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '').trim();
}

/** Parse <item> blocks from the RSS XML. */
function parseItems(xml) {
  const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  return itemBlocks.slice(0, MAX_POSTS).map(item => {
    const title = decodeEntities(extractTag(item, 'title'));

    // <link> is not in CDATA in Substack RSS — it sits between tags
    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/i);
    const url = linkMatch ? linkMatch[1].trim() : '';

    const date = extractTag(item, 'pubDate') || '';

    const rawDesc = extractTag(item, 'description');
    const description = decodeEntities(stripHtml(rawDesc)).slice(0, 300);

    // Cover image: <enclosure url="..."> is the canonical Substack cover
    const enclosureMatch = item.match(/<enclosure\s+url="([^"]+)"/i);
    const coverImage = enclosureMatch ? enclosureMatch[1] : '';

    const author = decodeEntities(extractTag(item, 'dc:creator')) || 'Suha Rehma';

    return { title, url, date, description, coverImage, author };
  }).filter(p => p.title && p.url);
}

async function main() {
  console.log(`Fetching ${RSS_URL} …`);

  const res = await fetch(RSS_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SubstackFetcher/1.0)' },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  const posts = parseItems(xml);

  if (posts.length === 0) {
    throw new Error('No posts found — RSS may have changed format.');
  }

  const output = {
    lastFetched: new Date().toISOString(),
    posts,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');
  console.log(`✓ Wrote ${posts.length} posts → src/data/substack-posts.json`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
