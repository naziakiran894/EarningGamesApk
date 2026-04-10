import "dotenv/config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { games } from "../src/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });
const contentDir = path.join(process.cwd(), "content", "games");

async function syncContent() {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  console.log(`Found ${files.length} MDX files to sync...`);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);

    const gameData = {
      slug: data.slug,
      title: data.title,
      description: data.seoDescription || "",
      version: data.version,
      fileSize: data.fileSize,
      downloadCount: data.downloadCount || 0,
      rating: String(data.rating),
      totalVotes: data.totalVotes || 0,
      category: data.category,
      osRequirements: data.osRequirements,
      iconUrl: data.icon,
      downloadUrl: data.downloadUrl,
      isNew: data.isNew || false,
      isUpdated: data.isUpdated || false,
      isFeatured: false,
      publishedAt: new Date(data.publishedAt),
      updatedAt: new Date(data.updatedAt),
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      tags: data.tags || [],
    };

    const existing = await db
      .select()
      .from(games)
      .where(eq(games.slug, data.slug))
      .limit(1);

    if (existing.length > 0) {
      await db.update(games).set(gameData).where(eq(games.slug, data.slug));
      console.log(`Updated: ${data.title}`);
    } else {
      await db.insert(games).values(gameData);
      console.log(`Inserted: ${data.title}`);
    }
  }

  console.log("Sync complete!");
}

syncContent().catch(console.error);
