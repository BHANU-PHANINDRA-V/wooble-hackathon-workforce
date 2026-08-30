import { NextResponse } from "next/server";
import { getFullSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getFullSessionUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user });
}
