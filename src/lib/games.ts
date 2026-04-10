import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const contentDir = path.join(process.cwd(), "content", "games");

export type GameCategory = "casino-games" | "earning-apps" | "tools" | "general";

const VALID_CATEGORIES = new Set<string>([
  "casino-games",
  "earning-apps",
  "tools",
  "general",
]);

/** Game listing + SEO fields (from MDX frontmatter). No DB — source of truth is `content/games/*.mdx`. */
export interface Game {
  slug: string;
  title: string;
  description: string | null;
  version: string | null;
  fileSize: string | null;
  downloadCount: number;
  rating: string | null;
  totalVotes: number;
  category: GameCategory;
  osRequirements: string | null;
  iconUrl: string | null;
  downloadUrl: string | null;
  googlePlayUrl: string | null;
  appStoreUrl: string | null;
  isNew: boolean;
  isUpdated: boolean;
  isFeatured: boolean;
  publishedAt: Date | null;
  updatedAt: Date | null;
  seoTitle: string | null;
  seoDescription: string | null;
  tags: string[];
}

function parseGameFile(filePath: string): Game | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  const d = data as Record<string, unknown>;
  const slug = String(d.slug || "");
  if (!slug) return null;
  const category = String(d.category);
  if (!VALID_CATEGORIES.has(category)) return null;

  return {
    slug,
    title: String(d.title || ""),
    description: d.seoDescription != null ? String(d.seoDescription) : null,
    version: d.version != null ? String(d.version) : null,
    fileSize: d.fileSize != null ? String(d.fileSize) : null,
    downloadCount: Number(d.downloadCount) || 0,
    rating: d.rating != null ? String(d.rating) : null,
    totalVotes: Number(d.totalVotes) || 0,
    category: category as GameCategory,
    osRequirements: d.osRequirements != null ? String(d.osRequirements) : null,
    iconUrl: d.icon != null ? String(d.icon) : null,
    downloadUrl: d.downloadUrl != null ? String(d.downloadUrl) : null,
    googlePlayUrl: d.googlePlayUrl != null ? String(d.googlePlayUrl) : null,
    appStoreUrl: d.appStoreUrl != null ? String(d.appStoreUrl) : null,
    isNew: Boolean(d.isNew),
    isUpdated: Boolean(d.isUpdated),
    isFeatured: Boolean(d.isFeatured),
    publishedAt: d.publishedAt ? new Date(String(d.publishedAt)) : null,
    updatedAt: d.updatedAt ? new Date(String(d.updatedAt)) : null,
    seoTitle: d.seoTitle != null ? String(d.seoTitle) : null,
    seoDescription: d.seoDescription != null ? String(d.seoDescription) : null,
    tags: Array.isArray(d.tags) ? d.tags.map(String) : [],
  };
}

function loadGamesFromDisk(): Game[] {
  if (!fs.existsSync(contentDir)) return [];

  const games: Game[] = [];
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith(".mdx")) continue;
    const g = parseGameFile(path.join(contentDir, file));
    if (g) games.push(g);
  }

  return games.sort((a, b) => {
    const ta = a.publishedAt?.getTime() ?? 0;
    const tb = b.publishedAt?.getTime() ?? 0;
    return tb - ta;
  });
}

export const getAllGames = cache(async (): Promise<Game[]> => loadGamesFromDisk());

export const getGameBySlug = cache(async (slug: string): Promise<Game | undefined> => {
  const all = await getAllGames();
  return all.find((g) => g.slug === slug);
});

export async function getFeaturedGames(limit = 6): Promise<Game[]> {
  const all = await getAllGames();
  return all
    .filter((g) => g.isFeatured)
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, limit);
}

export async function getLatestGames(limit = 12, offset = 0): Promise<Game[]> {
  const all = await getAllGames();
  return all.slice(offset, offset + limit);
}

export async function getGamesByCategory(
  category: GameCategory,
  page = 1,
  limit = 12,
  sortBy: "newest" | "top-rated" | "most-viewed" = "newest"
): Promise<{ games: Game[]; total: number }> {
  const all = (await getAllGames()).filter((g) => g.category === category);

  const sorted = [...all].sort((a, b) => {
    if (sortBy === "top-rated") {
      return Number(b.rating) - Number(a.rating);
    }
    if (sortBy === "most-viewed") {
      return b.downloadCount - a.downloadCount;
    }
    return (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0);
  });

  const offset = (page - 1) * limit;
  return {
    games: sorted.slice(offset, offset + limit),
    total: sorted.length,
  };
}

export async function getRelatedGames(
  tags: string[],
  excludeSlug: string,
  limit = 6
): Promise<Game[]> {
  if (!tags.length) return [];
  const tagSet = new Set(tags);
  const all = await getAllGames();
  return all
    .filter(
      (g) =>
        g.slug !== excludeSlug &&
        (g.tags?.some((t) => tagSet.has(t)) ?? false)
    )
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, limit);
}

export async function getTopRated(limit = 5): Promise<Game[]> {
  const all = await getAllGames();
  return [...all].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, limit);
}

export async function getMostViewed(limit = 5): Promise<Game[]> {
  const all = await getAllGames();
  return [...all].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, limit);
}

export async function searchGames(query: string): Promise<Game[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await getAllGames();
  return all
    .filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        (g.description?.toLowerCase().includes(q) ?? false)
    )
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 20);
}

export async function getTotalGamesCount(): Promise<number> {
  return (await getAllGames()).length;
}

export async function getTotalDownloads(): Promise<number> {
  const all = await getAllGames();
  return all.reduce((sum, g) => sum + (g.downloadCount || 0), 0);
}
