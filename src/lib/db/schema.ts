import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  date,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", [
  "casino-games",
  "earning-apps",
  "tools",
  "general",
]);

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  version: text("version"),
  fileSize: text("file_size"),
  downloadCount: integer("download_count").default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  totalVotes: integer("total_votes").default(0),
  category: categoryEnum("category").notNull(),
  osRequirements: text("os_requirements"),
  iconUrl: text("icon_url"),
  downloadUrl: text("download_url"),
  googlePlayUrl: text("google_play_url"),
  appStoreUrl: text("app_store_url"),
  isNew: boolean("is_new").default(false),
  isUpdated: boolean("is_updated").default(false),
  isFeatured: boolean("is_featured").default(false),
  publishedAt: timestamp("published_at"),
  updatedAt: timestamp("updated_at"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  tags: text("tags").array(),
});

export const apkVersions = pgTable("apk_versions", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .references(() => games.id)
    .notNull(),
  version: text("version").notNull(),
  releaseDate: date("release_date"),
  changelog: text("changelog"),
});

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;
export type ApkVersion = typeof apkVersions.$inferSelect;
export type NewApkVersion = typeof apkVersions.$inferInsert;
