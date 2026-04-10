export default function GameLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 h-5 w-48 animate-pulse rounded bg-muted" />

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="h-24 w-24 animate-pulse rounded-2xl bg-muted md:h-32 md:w-32" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="flex gap-4">
              <div className="h-5 w-32 animate-pulse rounded bg-muted" />
              <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-muted" style={{ width: `${85 - i * 5}%` }} />
          ))}
        </div>
        <aside className="hidden lg:block">
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
        </aside>
      </div>
    </div>
  );
}
