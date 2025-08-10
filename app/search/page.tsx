import { generateSerp } from "@/lib/serp";
import Link from "next/link";
import SearchForm from "@/components/search-form";

export const dynamic = "force-static";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").toString();
  const items = q ? generateSerp(q, 10) : [];
  return (
    <div className="min-h-dvh w-full flex flex-col items-center px-6 py-12 gap-8">
      <div className="flex flex-col items-center gap-4">
        <Link href="/" className="text-2xl font-semibold tracking-tight">Internet of Vibes</Link>
        <SearchForm initialQuery={q} />
      </div>

      {q && (
        <div className="w-full max-w-3xl space-y-4">
          <p className="text-sm text-muted-foreground">About {items.length} synthetic results</p>
          <ul className="space-y-6">
            {items.map((it, i) => (
              <li key={i} className="group">
                <div className="text-sm text-emerald-700 dark:text-emerald-400">{it.domain}{it.path}</div>
                <Link href={`/u/you/s/${it.domain}${it.path}`} className="text-xl font-medium text-primary hover:underline">
                  {it.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{it.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!q && (
        <div className="text-muted-foreground text-sm">Type a query to generate your SERP.</div>
      )}
    </div>
  );
}
