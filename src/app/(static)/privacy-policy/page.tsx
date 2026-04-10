import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for EarningGames.pk. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Breadcrumb items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />

      <h1 className="mb-6 font-heading text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-sm text-muted-foreground">Last updated: April 10, 2026</p>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          At EarningGames.pk, we are committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you visit our
          website.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways including: personal data you
          voluntarily provide (such as contact form submissions), derivative data automatically
          collected when accessing the site (IP address, browser type, operating system), and data
          from cookies and similar tracking technologies.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Use of Your Information</h2>
        <p>
          We use collected information to operate and maintain our website, improve user experience,
          analyze usage trends, and respond to inquiries. We do not sell your personal information
          to third parties.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Third-Party Services</h2>
        <p>
          We may use third-party analytics services (such as Vercel Analytics) that collect, monitor,
          and analyze usage data. These services have their own privacy policies addressing how they
          use such information.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Cookies</h2>
        <p>
          We may use cookies and similar tracking technologies to track activity on our website. You
          can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us through our{" "}
          <a href="/contact" className="text-primary underline underline-offset-2">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
