import { NextResponse } from "next/server";
import { getCharacters } from "@/lib/api";

export const dynamic = "force-dynamic";

// sends the visitor to a random character; the archive's ids run 1..count with no gaps
export async function GET(request: Request) {
  let count = 826;
  try {
    count = (await getCharacters()).info.count;
  } catch {
    // keep the last known count
  }
  const id = 1 + Math.floor(Math.random() * count);
  return NextResponse.redirect(new URL(`/character/${id}`, request.url), 307);
}
