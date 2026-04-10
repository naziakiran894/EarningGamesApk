import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";
import {
  getGameBySlug,
  getRelatedGames,
  getTopRated,
  getMostViewed,
  getAllGames,
} from "@/lib/games";
import { getGameContent, generateTOC, extractFAQs } from "@/lib/mdx";
import { generateGameMetadata } from "@/lib/seo";
import { GameHero } from "@/components/game/GameHero";
import { DownloadButton } from "@/components/game/DownloadButton";
import { RelatedGames } from "@/components/game/RelatedGames";
import { ReportModal } from "@/components/game/ReportModal";
import { TableOfContents } from "@/components/mdx/TableOfContents";
import { ProsCons } from "@/components/mdx/ProsCons";
import { VersionTable } from "@/components/mdx/VersionTable";
import { FAQAccordion } from "@/components/mdx/FAQAccordion";
import { DownloadGuide } from "@/components/mdx/DownloadGuide";
import { SystemRequirements } from "@/components/mdx/SystemRequirements";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GameSchema } from "@/components/seo/GameSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { GameCard } from "@/components/game/GameCard";
import { getCategoryLabel } from "@/lib/seo";
import type { Game } from "@/lib/games";

export const revalidate = 86400;

const mdxComponents = {
  ProsCons,
  VersionTable,
  FAQAccordion,
  DownloadGuide,
  SystemRequirements,
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : "";
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h2 id={id} className="mt-10 mb-4 scroll-mt-20 font-heading text-2xl font-bold" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : "";
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h3 id={id} className="mt-8 mb-3 scroll-mt-20 font-heading text-xl font-semibold" {...props}>
        {children}
      </h3>
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-4 list-disc space-y-1 text-muted-foreground" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-4 list-decimal space-y-1 text-muted-foreground" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary underline underline-offset-2 hover:text-primary/80" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-border bg-muted/50" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-heading font-semibold" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-muted-foreground" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-border last:border-0" {...props} />
  ),
};

async function SidebarContent() {
  const [topRated, mostViewed] = await Promise.all([
    getTopRated(5),
    getMostViewed(5),
  ]);

  return (
    <div className="space-y-6">
      <SidebarList title="Top Rated" games={topRated} />
      <SidebarList title="Most Downloaded" games={mostViewed} />
    </div>
  );
}

function SidebarList({ title, games }: { title: string; games: Game[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-2">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const games = await getAllGames();
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "Game Not Found" };
  return generateGameMetadata(game);
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [game, mdxContent] = await Promise.all([
    getGameBySlug(slug),
    getGameContent(slug),
  ]);

  if (!game) notFound();

  const content = mdxContent?.content || "";
  const toc = generateTOC(content);
  const faqs = extractFAQs(content);

  const relatedGames = game.tags
    ? await getRelatedGames(game.tags, game.slug)
    : [];

  const categoryLabel = getCategoryLabel(game.category);

  return (
    <>
      <GameSchema game={game} />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
      <ArticleSchema
        title={game.seoTitle || game.title}
        description={game.seoDescription || game.description || ""}
        url={`/games/${game.slug}`}
        image={game.iconUrl || undefined}
        datePublished={game.publishedAt?.toISOString() || ""}
        dateModified={game.updatedAt?.toISOString() || ""}
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb
          items={[
            { name: categoryLabel, href: `/category/${game.category}` },
            { name: game.title, href: `/games/${game.slug}` },
          ]}
        />

        <GameHero game={game} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <article className="prose-custom">
              {content ? (
                <MDXRemote source={content} components={mdxComponents} />
              ) : (
                <p className="text-muted-foreground">
                  Content for this game is coming soon.
                </p>
              )}
            </article>

            <div className="mt-8">
              <ReportModal gameName={game.title} />
            </div>

            <RelatedGames games={relatedGames} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {toc.length > 0 && <TableOfContents items={toc} />}
              <Suspense
                fallback={
                  <div className="h-64 animate-pulse rounded-xl bg-muted" />
                }
              >
                <SidebarContent />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>

      {game.downloadUrl && (
        <DownloadButton
          url={game.downloadUrl}
          gameName={game.title}
          sticky
        />
      )}
    </>
  );
}
