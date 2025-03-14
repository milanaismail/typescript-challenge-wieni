"use client";

import { useEffect, useState } from "react";
import CocktailCard from "./components/card";

interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: { unit?: string; amount?: number; ingredient: string; special?: string }[];
  preparation: string;
}

export default function Home() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    async function fetchPopularCocktails() {
      try{
        const response = await fetch("/api/recipes/popular");
        const data = await response.json();
        setCocktails(data);
      }
      catch(error){
        console.error(error);
      }
    }
    fetchPopularCocktails();
  }, []);


  return (
    <main>
      <div 
        className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/assets/hero-image-2.jpeg')" }}
      >
        <div className="absolute inset-0 h-[500px] bg-black/30"></div>
          <div className="absolute inset-0 flex items-end justify-center z-10 p-6 mb-10">
            <h1 className="text-beige text-5xl">Timeless cocktails, classic flavors</h1>
          </div>
      </div>

      <div className="w-full p-4"> 
        <div className="container mx-auto m-4">
            <h2>Our most popular cocktails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cocktails.map((cocktail) => (
                  <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))}
            </div>
          </div>
        </div>
    </main>
  );
}
