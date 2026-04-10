import { eq, desc, sql, arrayOverlaps, ne, and, ilike, or } from "drizzle-orm";
import { db } from ".";
import { games, apkVersions, type Game } from "./schema";

export async function getAllGames(): Promise<Game[]> {
  return db.select().from(games).orderBy(desc(games.publishedAt));
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  const results = await db
    .select()
    .from(games)
    .where(eq(games.slug, slug))
    .limit(1);
  return results[0];
}

export async function getFeaturedGames(limit = 6): Promise<Game[]> {
  return db
    .select()
    .from(games)
    .where(eq(games.isFeatured, true))
    .orderBy(desc(games.rating))
    .limit(limit);
}

export async function getLatestGames(limit = 12, offset = 0): Promise<Game[]> {
  return db
    .select()
    .from(games)
    .orderBy(desc(games.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getGamesByCategory(
  category: Game["category"],
  page = 1,
  limit = 12,
  sortBy: "newest" | "top-rated" | "most-viewed" = "newest"
): Promise<{ games: Game[]; total: number }> {
  const offset = (page - 1) * limit;

  const orderClause =
    sortBy === "top-rated"
      ? desc(games.rating)
      : sortBy === "most-viewed"
        ? desc(games.downloadCount)
        : desc(games.publishedAt);

  const [results, countResult] = await Promise.all([
    db
      .select()
      .from(games)
      .where(eq(games.category, category))
      .orderBy(orderClause)
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(games)
      .where(eq(games.category, category)),
  ]);

  return { games: results, total: Number(countResult[0].count) };
}

export async function getRelatedGames(
  tags: string[],
  excludeSlug: string,
  limit = 6
): Promise<Game[]> {
  return db
    .select()
    .from(games)
    .where(and(arrayOverlaps(games.tags, tags), ne(games.slug, excludeSlug)))
    .orderBy(desc(games.rating))
    .limit(limit);
}

export async function getTopRated(limit = 5): Promise<Game[]> {
  return db
    .select()
    .from(games)
    .orderBy(desc(games.rating))
    .limit(limit);
}

export async function getMostViewed(limit = 5): Promise<Game[]> {
  return db
    .select()
    .from(games)
    .orderBy(desc(games.downloadCount))
    .limit(limit);
}

export async function searchGames(query: string): Promise<Game[]> {
  return db
    .select()
    .from(games)
    .where(
      or(
        ilike(games.title, `%${query}%`),
        ilike(games.description, `%${query}%`)
      )
    )
    .orderBy(desc(games.rating))
    .limit(20);
}

export async function getApkVersions(gameId: number) {
  return db
    .select()
    .from(apkVersions)
    .where(eq(apkVersions.gameId, gameId))
    .orderBy(desc(apkVersions.releaseDate));
}

export async function getTotalGamesCount(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(games);
  return Number(result[0].count);
}

export async function getTotalDownloads(): Promise<number> {
  const result = await db
    .select({ total: sql<number>`coalesce(sum(download_count), 0)` })
    .from(games);
  return Number(result[0].total);
}
