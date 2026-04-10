import { NextResponse } from "next/server";
import { getAllGames } from "@/lib/db/queries";

export const revalidate = 3600;

export async function GET() {
  const games = await getAllGames();
  return NextResponse.json(games);
}
