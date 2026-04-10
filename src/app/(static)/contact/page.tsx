import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the EarningGames.pk team. Report issues, suggest apps, or ask questions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Breadcrumb items={[{ name: "Contact Us", href: "/contact" }]} />

      <h1 className="mb-6 font-heading text-3xl font-bold">Contact Us</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <Mail className="mb-3 h-6 w-6 text-primary" />
          <h3 className="font-heading font-semibold">Email</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            contact@earninggames.pk
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <MessageCircle className="mb-3 h-6 w-6 text-accent" />
          <h3 className="font-heading font-semibold">WhatsApp</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Available 9 AM – 9 PM PKT
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 font-heading text-xl font-semibold">Send a Message</h2>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="Your name" className="bg-background" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" className="bg-background" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
              Subject
            </label>
            <select
              id="subject"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="general">General Inquiry</option>
              <option value="report">Report an Issue</option>
              <option value="suggest">Suggest an App</option>
              <option value="business">Business Inquiry</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none"
            />
          </div>
          <Button type="submit" className="w-full gradient-primary text-white">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
