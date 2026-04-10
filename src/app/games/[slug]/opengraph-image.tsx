import { ImageResponse } from "next/og";
import { getGameBySlug } from "@/lib/db/queries";

export const alt = "Game Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f0f1a",
            color: "#fff",
            fontSize: 48,
          }}
        >
          Game Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#0f0f1a",
          backgroundImage:
            "linear-gradient(135deg, #0f0f1a 0%, #1e1033 50%, #0f0f1a 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              backgroundColor: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {game.title.charAt(0)}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {game.title}
            </div>
            <div
              style={{
                fontSize: 24,
                color: "#a0a0b8",
                marginTop: 8,
              }}
            >
              {game.version} • {game.fileSize}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: 28, color: "#facc15" }}>★</div>
            <div style={{ fontSize: 28, color: "#fff", fontWeight: 600 }}>
              {game.rating}
            </div>
            <div style={{ fontSize: 20, color: "#a0a0b8" }}>
              ({game.totalVotes} votes)
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: 28, color: "#10b981" }}>↓</div>
            <div style={{ fontSize: 28, color: "#fff", fontWeight: 600 }}>
              {Number(game.downloadCount).toLocaleString()}
            </div>
            <div style={{ fontSize: 20, color: "#a0a0b8" }}>downloads</div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            fontSize: 20,
            color: "#7c3aed",
            fontWeight: 600,
          }}
        >
          EarningGames.pk
        </div>
      </div>
    ),
    { ...size }
  );
}
