import { NextResponse } from "next/server";
import cocktails from "../../cocktails/cocktails.json";

export async function GET() {
  return NextResponse.json(cocktails);
}
