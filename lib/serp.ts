import crypto from "crypto";

export type SerpItem = {
  title: string;
  snippet: string;
  domain: string;
  path: string;
};

export function stableSeed(parts: string[]): number {
  const hash = crypto.createHash("sha256");
  for (const p of parts) hash.update(p);
  // Take first 8 bytes as a 32-bit unsigned integer
  const buf = hash.digest();
  const n = buf.readUInt32BE(0);
  return n >>> 0;
}

function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    // xorshift32
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

const nouns = [
  "atlas",
  "compass",
  "forge",
  "horizon",
  "archive",
  "orchard",
  "voyage",
  "catalyst",
  "blueprint",
  "matrix",
  "bazaar",
  "lighthouse",
  "workshop",
  "playground",
  "commons",
];
const tlds = [".site", ".web", ".space", ".page", ".zone", ".world"];

function synthDomain(r: () => number) {
  const a = ["hyper", "neo", "prime", "meta", "vibe", "echo", "alpha"];
  const b = nouns;
  const t = tlds;
  const pick = (arr: string[]) => arr[Math.floor(r() * arr.length)];
  return `${pick(a)}${pick(b)}${pick(t)}`;
}

export function generateSerp(query: string, count = 10): SerpItem[] {
  const seed = stableSeed([query]);
  const r = prng(seed);
  const items: SerpItem[] = [];
  for (let i = 0; i < count; i++) {
    const domain = synthDomain(r);
    const path = "/" + query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + `-${i+1}`;
    const title = `${query} — ${["Guide", "Overview", "Deep Dive", "Patterns", "Playbook"][Math.floor(r()*5)]}`;
    const snippet = `A coherent, synthetic page about ${query}, generated on-demand with deterministic seeds.`;
    items.push({ title, snippet, domain, path });
  }
  return items;
}
