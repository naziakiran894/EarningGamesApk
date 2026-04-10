import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for EarningGames.pk. Important information about the content and services provided on our website.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Breadcrumb items={[{ name: "Disclaimer", href: "/disclaimer" }]} />

      <h1 className="mb-6 font-heading text-3xl font-bold">Disclaimer</h1>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          The information provided on EarningGames.pk is for general informational purposes only. All
          information on the site is provided in good faith; however, we make no representation or
          warranty of any kind, express or implied, regarding the accuracy, adequacy, validity,
          reliability, or completeness of any information on the site.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">External Links</h2>
        <p>
          EarningGames.pk may contain links to external websites that are not provided or maintained
          by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any
          information on these external websites. Download links redirect to third-party platforms
          and we are not responsible for their content.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Financial Risk</h2>
        <p>
          Earning games and casino applications involve financial risk. Users should exercise caution
          and never invest more than they can afford to lose. Past earnings or performance of any
          application are not indicative of future results. We are not financial advisors and do not
          provide financial advice.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">No Endorsement</h2>
        <p>
          Listing an application on this website does not constitute an endorsement. Our reviews
          represent the opinions of our editorial team based on testing and research. Users should
          conduct their own due diligence before downloading or using any application.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground">Affiliate Disclosure</h2>
        <p>
          Some links on this website may be affiliate links. This means we may earn a commission if
          you click on the link and install or sign up for the application. This does not affect
          our editorial integrity or the accuracy of our reviews.
        </p>
      </div>
    </div>
  );
}
