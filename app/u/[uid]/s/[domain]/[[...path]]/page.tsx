import { sanitizeHtml } from "@/lib/sanitize";
import { stableSeed } from "@/lib/serp";

export const dynamic = "force-static";

function generateHtml({ uid, domain, path }: { uid: string; domain: string; path: string[] | undefined }) {
  const seed = stableSeed([uid, domain, ...(path ?? [])]);
  const title = `${domain} — ${path?.join("/") || "home"}`;
  const body = `
  <header class="max-w-3xl mx-auto py-8">
    <h1 class="text-3xl font-semibold">${title}</h1>
    <p class="text-muted-foreground">Deterministic page seed: ${seed}</p>
    <nav class="mt-4 text-sm">
      <a href="/" class="underline">Search</a>
      <span class="mx-2">·</span>
      <a href="/public/${domain}${path ? "/" + path.join("/") : ""}" class="underline">View public (if published)</a>
    </nav>
  </header>
  <main class="max-w-3xl mx-auto space-y-6 pb-16">
    <section>
      <h2 class="text-xl font-medium">Overview</h2>
      <p class="mt-2 text-base leading-7">This is a synthetic page rendered from a template. Content is coherent, safe, and deterministic for this route.</p>
    </section>
    <section>
      <h3 class="text-lg font-medium">Next Links</h3>
      <ul class="list-disc pl-5 mt-2 text-sm">
        <li><a class="underline" href="/${domain}/about">About</a></li>
        <li><a class="underline" href="/${domain}/guide/getting-started">Getting Started</a></li>
        <li><a class="underline" href="/${domain}/patterns">Patterns</a></li>
      </ul>
    </section>
  </main>`;
  const html = `<!doctype html><html><head><meta charSet="utf-8"/><title>${title}</title></head><body>${body}</body></html>`;
  return sanitizeHtml(html);
}

export default async function UserSitePage({ params }: { params: Promise<{ uid: string; domain: string; path?: string[] }> }) {
  const { uid, domain, path } = await params;
  const html = generateHtml({ uid, domain, path });
  return (
    <div className="min-h-dvh">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
