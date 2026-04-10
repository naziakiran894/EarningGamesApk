import { Suspense } from "react";
import { SearchPageClient } from "./SearchPageClient";

function SearchFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 h-9 w-48 animate-pulse rounded bg-muted" />
      <div className="mb-6 h-12 max-w-2xl animate-pulse rounded-xl bg-muted" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPageClient />
    </Suspense>
  );
}
