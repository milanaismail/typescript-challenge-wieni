import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/all`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to fetch cocktails" }, { status: 500 });
    }

    const allCocktails = await response.json();

    if (!Array.isArray(allCocktails)) {
      return NextResponse.json({ message: "Invalid data format" }, { status: 500 });
    }

    const popularCocktails = allCocktails
      .filter((cocktail) => cocktail.popularity !== undefined)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);

    return NextResponse.json(popularCocktails, { status: 200 });
  } catch (error) {
    console.error("Error fetching popular cocktails:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
