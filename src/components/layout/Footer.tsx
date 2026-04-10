import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Categories",
    links: [
      { href: "/category/casino-games", label: "Casino Games" },
      { href: "/category/earning-apps", label: "Earning Apps" },
      { href: "/category/tools", label: "Tools & Injectors" },
      { href: "/category/general", label: "General" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/terms-conditions", label: "Terms & Conditions" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/search", label: "Search Apps" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <span>
                Earning<span className="text-primary">Games</span>.pk
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Pakistan&apos;s trusted source for earning game reviews, casino app guides, and safe APK downloads. Updated daily.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EarningGames.pk. All rights reserved. This site is for informational purposes only.
        </p>
      </div>
    </footer>
  );
}
