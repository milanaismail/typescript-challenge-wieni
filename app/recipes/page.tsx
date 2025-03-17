import { Cocktail } from "../types/types";
import CocktailCard from "../components/card";

import "../globals.css";

async function getAllCocktails() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/all`, {
    cache: "no-store",
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch all cocktails");
  }

  return response.json();
}

export default async function RecipePage() {
  const cocktails: Cocktail[] = await getAllCocktails();

  return (
    <main className="pt-20">
      <div>
        <div className="w-full p-4">
          <div className="container mx-auto m-4">
            <h1>All cocktail recipes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {cocktails.map((cocktail) => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
