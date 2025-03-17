"use client";

import { useEffect, useState } from "react";
import CocktailCard from "../components/card";

interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: { unit?: string; amount?: number; ingredient: string; special?: string }[];
  preparation: string;
}


export default function RecipePage() {
  const [recipes, setRecipes] = useState<Cocktail[]>([]);
  
  useEffect(() => {
    async function fetchCocktails() {
      try{
        const response = await fetch("/api/recipes/all");
        const data = await response.json();
        setRecipes(data);
      }
      catch(error){
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
              <h2>All cocktail recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                  <CocktailCard key={recipe.id} cocktail={recipe} />
                ))}
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}
