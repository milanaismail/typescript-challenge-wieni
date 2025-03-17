"use client";

import { useState, useMemo, useEffect } from "react";
import { Cocktail } from "../types/types";
import CocktailCard from "../components/card";
import { X } from 'lucide-react';
import Fuse from "fuse.js";

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
  return <ClientRecipePage cocktails={cocktails} />;
}

function ClientRecipePage({ cocktails }: { cocktails: Cocktail[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fuse = useMemo(() => new Fuse(cocktails, { keys: ["name"], threshold: 0.3 }), [cocktails]);

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse]);

  const filteredCocktails = useMemo(() => {
    if (!searchTerm) return cocktails;
    return suggestions;
  }, [searchTerm, suggestions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (suggestions.length === 0) return;

      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1 < suggestions.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : suggestions.length - 1));
      } else if (e.key === "Enter" && selectedIndex !== -1) {
        setSearchTerm(suggestions[selectedIndex].name);
        setShowSuggestions(false);
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, suggestions]);

  return (
    <main className="pt-20">
      <div>
        <div className="w-full p-4">
          <div className="container mx-auto m-4">
            <h1>All cocktail recipes</h1>
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search for a cocktail"
                className="w-full p-2 border border-bordeaux bg-transparent text-gray-700"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Close dropdown on blur
                aria-label="Search for a cocktail by name"
              />
                 {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
                >
                  <X size={16} />
                </button>
              )}
              
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  role="listbox"
                  className="absolute w-full border border-bordeaux border-t-0 z-10 max-h-60 overflow-auto"
                >
                  {suggestions.map((cocktail, index) => (
                    <li
                      key={cocktail.id}
                      role="option"
                      aria-selected={selectedIndex === index}
                      className={`p-2 cursor-pointer hover:bg-[#ebdcc6] ${selectedIndex === index ? "bg-[#ded2be]" : "bg-beige"}`}
                      onMouseDown={() => setSearchTerm(cocktail.name)}
                    >
                      {highlightMatch(cocktail.name, searchTerm)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredCocktails.length > 0 ? (
                filteredCocktails.map((cocktail) => (
                  <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No cocktails found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function highlightMatch(name: string, query: string) {
  if (!query) return name;
  const regex = new RegExp(`(${query})`, "gi");
  return name.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}
