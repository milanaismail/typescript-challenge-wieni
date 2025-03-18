import { Cocktail } from "../types/types";

import { getAllCocktails } from "../lib/getCocktails";
import ClientRecipePage from "./ClientRecipePage";

import "../globals.css";

export default async function RecipePage() {
  const cocktails: Cocktail[] = await getAllCocktails();

  const categoryCounts: Record<string, number> = {};
  cocktails.forEach((c) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });

  const ingredientCounts: Record<string, number> = {};
  cocktails.forEach((c) => {
    c.ingredients.forEach((ing) => {
      ingredientCounts[ing.ingredient] = (ingredientCounts[ing.ingredient] || 0) + 1;
    });
  });

  const initialCategories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));
  const initialIngredients = Object.entries(ingredientCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <ClientRecipePage
      cocktails={cocktails}
      initialCategories={initialCategories}
      initialIngredients={initialIngredients}
    />
  );
}
