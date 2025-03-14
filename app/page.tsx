"use client";

import { useEffect, useState } from "react";

interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
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
            <div>
              <h2>Our most popular cocktails</h2>
            </div>
            <div className="">
              <ul className="grid grid-cols-2 gap-4 mt-4">
                {cocktails.map((cocktail, index) => (
                  <li key={cocktail.id || index}>
                    <h3 className="text-lg">{cocktail.name}</h3>
                    <p className="text-sm">{cocktail.category}</p>
                    <img src={cocktail.image} alt={cocktail.name} className="w-full h-48 object-cover rounded" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </main>
  );
}
