import { NextResponse } from "next/server";
import cocktails from "../../cocktails/cocktails.json";

export async function GET() {
  const updatedCocktails = cocktails.map((cocktail) => ({
    ...cocktail,
    category:
      (cocktail.category?.trim() === "" ? "After Dinner Cocktail" : cocktail.category) ??
      "After Dinner Cocktail",
  }));

  return NextResponse.json(updatedCocktails);
}
