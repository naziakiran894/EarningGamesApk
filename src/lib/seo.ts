import type { Metadata } from "next";
import type { Game } from "@/lib/db/schema";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://earninggames.pk";
export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "EarningGames.pk";

const CATEGORY_LABELS: Record<string, string> = {
  "casino-games": "Casino Games",
  "earning-apps": "Earning Apps",
  tools: "Tools & Injectors",
  general: "General",
};

export function generateGameMetadata(game: Game): Metadata {
  const title =
    game.seoTitle ||
    `${game.title} Download APK 2026 – Free App Pakistan | ${SITE_NAME}`;
  const description =
    game.seoDescription ||
    `Download ${game.title} APK for Pakistan. Latest version ${game.version}, ${game.fileSize}. Safe & verified APK download guide.`;

  const url = `${BASE_URL}/games/${game.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: game.iconUrl
        ? [{ url: `${BASE_URL}${game.iconUrl}`, width: 512, height: 512, alt: `${game.title} APK download icon` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function generateCategoryMetadata(
  category: string,
  page: number = 1
): Metadata {
  const label = CATEGORY_LABELS[category] || category;
  const title =
    page > 1
      ? `${label} – Page ${page} | ${SITE_NAME}`
      : `${label} – Download Best APKs Pakistan | ${SITE_NAME}`;
  const description = `Browse and download the best ${label.toLowerCase()} APKs for Pakistan. Verified safe downloads, updated daily.`;
  const url = `${BASE_URL}/category/${category}${page > 1 ? `/page/${page}` : ""}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
    },
    robots: page > 2 ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}
