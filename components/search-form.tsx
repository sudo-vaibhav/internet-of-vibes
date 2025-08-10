"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl flex items-center gap-2">
      <Input
        aria-label="Search"
        placeholder="Search your internet..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        iconLeft={<Search className="h-5 w-5" />}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
