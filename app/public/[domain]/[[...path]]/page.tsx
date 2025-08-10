export const dynamic = "force-static";

import Link from "next/link";

export default async function PublicPlaceholder({ params }: { params: Promise<{ domain: string; path?: string[] }> }) {
  const { domain, path } = await params;
  const full = `/${domain}${path ? "/" + path.join("/") : ""}`;
  return (
    <div className="min-h-dvh flex items-center justify-center px-6 py-12">
      <div className="max-w-xl text-center space-y-3">
        <h1 className="text-2xl font-semibold">No published artifact yet</h1>
        <p className="text-muted-foreground">{full} has not been published. If you have a draft, view it under your namespace.</p>
        <div>
          <Link className="underline" href="/">Return to search</Link>
        </div>
      </div>
    </div>
  );
}
