import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EarningGames.pk — Pakistan's trusted source for earning game reviews, casino app guides, and safe APK downloads.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Breadcrumb items={[{ name: "About Us", href: "/about" }]} />

      <h1 className="mb-6 font-heading text-3xl font-bold">About EarningGames.pk</h1>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          EarningGames.pk is Pakistan&apos;s premier destination for discovering, reviewing, and downloading
          earning games, casino applications, and mobile tools. Our mission is to provide Pakistani
          mobile users with accurate, up-to-date information about the apps that matter most to them.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Our Mission</h2>
        <p>
          We believe every Pakistani deserves access to reliable information about mobile earning
          opportunities. Our team tests every app we list, verifies download links daily, and
          provides honest reviews to help you make informed decisions.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">What We Do</h2>
        <ul className="ml-4 list-disc space-y-2">
          <li>Review and verify earning games and casino apps available in Pakistan</li>
          <li>Provide safe, direct APK download links tested for malware</li>
          <li>Write comprehensive guides on app features, payment methods, and safety</li>
          <li>Keep all listings updated with the latest versions and information</li>
        </ul>

        <h2 className="font-heading text-xl font-semibold text-foreground">Our Team</h2>
        <p>
          Our team consists of experienced mobile app reviewers and tech enthusiasts based in Pakistan.
          We understand the local market, payment systems like JazzCash and Easypaisa, and what
          Pakistani users need from their apps.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Contact Us</h2>
        <p>
          Have questions, feedback, or a game you&apos;d like us to review? Visit our{" "}
          <a href="/contact" className="text-primary underline underline-offset-2">
            contact page
          </a>{" "}
          to reach out.
        </p>
      </div>
    </div>
  );
}
