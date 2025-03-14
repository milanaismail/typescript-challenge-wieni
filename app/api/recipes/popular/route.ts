import { NextResponse } from "next/server";
import cocktailDetails from "../../cocktails/cocktails.json";

export async function GET() {
    if (!Array.isArray(cocktailDetails)) {
        return NextResponse.json({ message: "Invalid data format" }, { status: 500 });
    }

    const popularCocktails = cocktailDetails
    .filter(cocktail => cocktail.popularity !== undefined) 
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);
    
    return NextResponse.json(popularCocktails, { status: 200 });
}