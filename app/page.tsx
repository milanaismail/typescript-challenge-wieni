"use client";

import { useEffect, useState } from "react";
interface Cocktail {
  id: number;
  name: string;
  category: string;
}

export default function Home() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    async function fetchCocktails() {
      try{
        const response = await fetch("/api/cocktails");
        const data = await response.json();
        setCocktails(data);
      }
      catch(error){
        console.error(error);
      }
    }
    fetchCocktails();
  }, []);


  return (
    <main>
      <div 
        className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/assets/hero-image.jpeg')" }}
      >
        <div className="absolute inset-0 h-[500px] bg-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 p-6">
            <h1 className="text-white text-5xl">Timeless cocktails, classic flavors</h1>
          </div>
      </div>

      <div className="container mx-auto p-4"> 
          <div>
            <h2 className="text-2xl">Our most popular cocktails</h2>
          </div>
          <div className="">
            <ul className="grid grid-cols-2 gap-4 mt-4">
              {cocktails.map((cocktail, index) => (
                <li key={cocktail.id || index}  className="p-4 border rounded shadow">
                  <h3 className="text-lg">{cocktail.name}</h3>
                  <p className="text-sm">{cocktail.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </main>
  );
}
