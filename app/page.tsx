import SearchForm from "@/components/search-form";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconSearch, IconWorld, IconCloud } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 gap-10">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight">Internet of Vibes</h1>
        <p className="text-muted-foreground">A Google-like portal into your synthetic internet</p>
        <SearchForm />
      </div>
      <FloatingDock
        items={[
          { title: "Search", icon: <IconSearch className="h-5 w-5" />, href: "/search" },
          { title: "Explore", icon: <IconWorld className="h-5 w-5" />, href: "/search?q=explore" },
          { title: "Cloud", icon: <IconCloud className="h-5 w-5" />, href: "/search?q=cloud" },
        ]}
        desktopClassName="mt-6"
      />
    </div>
  );
}
