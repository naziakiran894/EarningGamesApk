import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for using EarningGames.pk. Please read these terms carefully before using our website.",
};

export default function TermsConditionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Breadcrumb items={[{ name: "Terms & Conditions", href: "/terms-conditions" }]} />

      <h1 className="mb-6 font-heading text-3xl font-bold">Terms & Conditions</h1>
      <p className="mb-4 text-sm text-muted-foreground">Last updated: April 10, 2026</p>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          By accessing and using EarningGames.pk, you accept and agree to be bound by the terms
          and provisions of this agreement. If you do not agree to these terms, you should not use
          this website.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Use of Content</h2>
        <p>
          All content on this website, including text, graphics, logos, and images, is the property
          of EarningGames.pk and is protected by applicable copyright laws. You may not reproduce,
          distribute, or transmit any content without prior written consent.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">User Responsibilities</h2>
        <p>
          Users are responsible for ensuring that their use of any applications listed on this
          website complies with local laws and regulations. You agree to use the information
          provided on this website at your own risk.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Limitation of Liability</h2>
        <p>
          EarningGames.pk shall not be liable for any direct, indirect, incidental, consequential,
          or punitive damages arising from your use of this website or any applications listed on it.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective
          immediately upon posting on this website. Your continued use of the website after changes
          constitutes acceptance of the new terms.
        </p>
      </div>
    </div>
  );
}
