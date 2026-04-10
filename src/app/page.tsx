import Link from "next/link";
import { Suspense } from "react";
import { Search, Shield, Download, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameGrid } from "@/components/game/GameGrid";
import { FAQAccordion } from "@/components/mdx/FAQAccordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import {
  getFeaturedGames,
  getLatestGames,
  getGamesByCategory,
  getTotalDownloads,
  getTotalGamesCount,
} from "@/lib/db/queries";

export const revalidate = 3600;

const homeFAQs = [
  { question: "What are earning games?", answer: "Earning games are mobile applications that allow users to earn real money by playing games, completing tasks, or participating in activities. These apps are popular in Pakistan and support payment methods like JazzCash and Easypaisa." },
  { question: "Are APK downloads safe?", answer: "APK files downloaded from trusted sources are generally safe. We verify every APK listed on our site for malware and security issues. Always download from official links and avoid unknown third-party sources." },
  { question: "How do I install an APK on Android?", answer: "Go to Settings > Security > Unknown Sources and enable it. Download the APK file, open your file manager, locate the downloaded file, and tap to install. Follow the on-screen instructions to complete installation." },
  { question: "Can I earn real money from these apps?", answer: "Yes, many apps listed on our site allow you to earn real money. Earnings vary based on the app, your activity level, and the games you play. Most apps support withdrawals via JazzCash, Easypaisa, or bank transfer." },
  { question: "Which payment methods are supported?", answer: "Most earning games and casino apps in Pakistan support JazzCash, Easypaisa, bank transfers, and some support cryptocurrency (USDT). Check each app's detail page for specific payment methods." },
  { question: "Are casino games legal in Pakistan?", answer: "The legal status of online casino games in Pakistan is complex. While there are no specific laws banning online gaming apps, users should exercise caution and understand the risks. Our site provides information for educational purposes." },
  { question: "Do I need an internet connection to play?", answer: "Most earning and casino games require a stable internet connection (3G, 4G, or Wi-Fi) to function properly. Some apps may offer limited offline features, but real-money features always require internet access." },
  { question: "How often are apps updated on this site?", answer: "We update our app listings daily. Game versions, download links, and reviews are regularly checked and refreshed to ensure accuracy. Check the 'Updated' badge on game cards for recently updated listings." },
  { question: "Can I use these apps on iPhone?", answer: "Many apps listed here are available for both Android and iOS. Check the system requirements on each game's detail page. Some apps may only be available as Android APKs." },
  { question: "How do I report a broken download link?", answer: "On any game's detail page, click the 'Report this app' button at the bottom of the article. Select 'Broken download link' as the reason and submit. Our team will fix it within 24 hours." },
];

async function StatsSection() {
  const [totalDownloads, totalGames] = await Promise.all([
    getTotalDownloads(),
    getTotalGamesCount(),
  ]);

  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold font-heading text-primary">
          <Download className="h-7 w-7" />
          {totalDownloads.toLocaleString()}+
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Total Downloads</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold font-heading text-accent">
          <Shield className="h-7 w-7" />
          {totalGames}+
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Verified Apps</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold font-heading text-yellow-400">
          <RefreshCw className="h-7 w-7" />
          Daily
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Updates</p>
      </div>
    </div>
  );
}

async function FeaturedSection() {
  const featured = await getFeaturedGames(6);
  if (featured.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">Top Rated Apps</h2>
      </div>
      <GameGrid games={featured} />
    </section>
  );
}

async function LatestSection() {
  const latest = await getLatestGames(12);
  if (latest.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">Latest Apps</h2>
      </div>
      <GameGrid games={latest} />
    </section>
  );
}

async function CasinoSection() {
  const { games } = await getGamesByCategory("casino-games", 1, 6);
  if (games.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">Casino Games</h2>
        <Link href="/category/casino-games">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <GameGrid games={games} columns={3} />
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={homeFAQs} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/5 to-transparent py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mx-auto max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Pakistan&apos;s #1 Source for{" "}
            <span className="text-primary">Earning Games</span> &{" "}
            <span className="text-accent">APK Downloads</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Discover verified earning apps, casino games, and tools. Safe APK downloads with JazzCash & Easypaisa support. Updated daily.
          </p>

          <form action="/search" className="mx-auto mt-8 flex max-w-lg gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Search games & apps..."
                className="h-12 pl-10 bg-card border-border rounded-xl"
              />
            </div>
            <Button type="submit" className="h-12 gradient-primary text-white rounded-xl px-6">
              Search
            </Button>
          </form>

          <div className="mt-12">
            <Suspense fallback={<div className="h-20 animate-pulse rounded bg-muted" />}>
              <StatsSection />
            </Suspense>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12">
        <Suspense fallback={<GridSkeleton />}>
          <FeaturedSection />
        </Suspense>

        <Suspense fallback={<GridSkeleton />}>
          <CasinoSection />
        </Suspense>

        <Suspense fallback={<GridSkeleton />}>
          <LatestSection />
        </Suspense>

        {/* FAQ */}
        <section>
          <h2 className="mb-6 font-heading text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={homeFAQs} />
          </div>
        </section>
      </div>
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  );
}
