"use client";

import { useEffect, useState } from "react";
import CocktailCard from "../components/card";
import "../globals.css";

interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: { unit?: string; amount?: number; ingredient: string; special?: string }[];
  preparation: string;
}

export default function RecipePage() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    async function fetchCocktails() {
      try {
        const response = await fetch("/api/recipes/all");
        const data = await response.json();
        setCocktails(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCocktails();
  }, []);

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
