import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "./RatingStars";
import { VersionBadge } from "./VersionBadge";
import type { Game } from "@/lib/games";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.slug}`}>
      <Card className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
              {game.iconUrl ? (
                <Image
                  src={game.iconUrl}
                  alt={`${game.title} APK download icon`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center gradient-primary text-xl font-bold text-white">
                  {game.title.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate font-heading text-sm font-semibold group-hover:text-primary transition-colors">
                  {game.title}
                </h3>
                <VersionBadge
                  isNew={game.isNew}
                  isUpdated={game.isUpdated}
                  isFeatured={game.isFeatured}
                />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {game.version} • {game.fileSize}
              </p>
              <div className="mt-1.5">
                <RatingStars rating={Number(game.rating) || 0} size="sm" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
