"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search as SearchIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GameGrid } from "@/components/game/GameGrid";
import type { Game } from "@/lib/db/schema";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "casino-games", label: "Casino Games" },
  { value: "earning-apps", label: "Earning Apps" },
  { value: "tools", label: "Tools" },
  { value: "general", label: "General" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      try {
        const res = await fetch("/api/games");
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(games, {
        keys: ["title", "description", "tags", "category"],
        threshold: 0.4,
        includeScore: true,
      }),
    [games]
  );

  const results = useMemo(() => {
    let filtered = query
      ? fuse.search(query).map((r) => r.item)
      : games;

    if (categoryFilter) {
      filtered = filtered.filter((g) => g.category === categoryFilter);
    }

    return filtered;
  }, [query, games, fuse, categoryFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 font-heading text-3xl font-bold">Search Apps</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, category, or tags..."
            className="h-12 pl-10 bg-card border-border rounded-xl"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-12 rounded-xl border border-border bg-card px-4 text-sm text-foreground"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""} found
            {query ? ` for "${query}"` : ""}
          </p>
          <GameGrid games={results} />
        </>
      ) : (
        <div className="py-16 text-center">
          <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-lg text-muted-foreground">
            {query
              ? `No results found for "${query}"`
              : "Start typing to search for apps"}
          </p>
        </div>
      )}
    </div>
  );
}
