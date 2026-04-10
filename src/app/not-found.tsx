import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="text-8xl font-heading font-bold text-primary/20">404</div>
      <h1 className="mt-4 font-heading text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Try searching for what
        you need or go back to the homepage.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button className="gradient-primary text-white">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="outline" className="border-border">
            <Search className="mr-2 h-4 w-4" />
            Search Apps
          </Button>
        </Link>
      </div>
    </div>
  );
}
