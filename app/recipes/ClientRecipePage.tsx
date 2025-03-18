"use client";

import { useState, useMemo, useEffect } from "react";
import { Cocktail } from "../types/types";
import CocktailCard from "../components/card";
import { X } from "lucide-react";
import { Filter } from "lucide-react";
import Fuse from "fuse.js";
import "../globals.css";

export default function ClientRecipePage({
  cocktails,
  initialCategories,
  initialIngredients,
}: {
  cocktails: Cocktail[];
  initialCategories: { name: string; count: number }[];
  initialIngredients: { name: string; count: number }[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const fuse = useMemo(
    () =>
      new Fuse(cocktails, {
        keys: ["name", "ingredients.ingredient"],
        threshold: 0.3,
      }),
    [cocktails]
  );

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((ing) => ing !== ingredient) : [...prev, ingredient]
    );
  };

  const filteredCocktails = useMemo(() => {
    return cocktails.filter((cocktail) => {
      const matchesCategory = !selectedCategory || cocktail.category === selectedCategory;
      const validIngredients = cocktail.ingredients.filter((ing) => ing.ingredient);
      const matchesIngredients =
        selectedIngredients.length === 0 ||
        validIngredients.some((ing) => selectedIngredients.includes(ing.ingredient.toLowerCase()));
      const matchesSearch =
        searchTerm.trim() === "" ||
        cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cocktail.ingredients.some(
          (ing) => ing.ingredient && ing.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ Check if `ing.ingredient` exists
        );
      const result = matchesCategory && matchesIngredients && matchesSearch;

      return result;
    });
  }, [searchTerm, selectedCategory, selectedIngredients, cocktails]);

  const categories = useMemo(() => {
    const categoryCounts = filteredCocktails.reduce((acc, cocktail) => {
      acc[cocktail.category] = (acc[cocktail.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return initialCategories.map((cat) => ({
      name: cat.name,
      count: categoryCounts[cat.name] || 0,
    }));
  }, [filteredCocktails, initialCategories]);

  const ingredients = useMemo(() => {
    const ingredientCounts = filteredCocktails.reduce((acc, cocktail) => {
      cocktail.ingredients.forEach((ing) => {
        acc[ing.ingredient] = (acc[ing.ingredient] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return initialIngredients.map((ing) => ({
      name: ing.name,
      count: ingredientCounts[ing.name] || 0,
    }));
  }, [filteredCocktails, initialIngredients]);

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);
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
            <div className="flex items-center justify-between">
              <h1>All cocktail recipes</h1>
              <button
                onClick={() => setShowFilters(true)}
                className="p-2 bg-darkGreen hover:bg-opacity-80 rounded-full"
              >
                <Filter className="cursor-pointer" size={18} />
              </button>
            </div>

            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search for a cocktail or ingredient..."
                className="w-full p-2 border border-bordeaux bg-transparent text-gray-700"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                aria-label="Search for a cocktail by name or ingredient"
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
                  className="absolute w-full border border-bordeaux border-t-0 z-10 max-h-60 overflow-auto bg-white shadow-md"
                >
                  {suggestions.map((cocktail, index) => (
                    <li
                      key={index}
                      role="option"
                      aria-selected={selectedIndex === index}
                      className={`p-2 cursor-pointer hover:bg-[#ebdcc6] ${
                        selectedIndex === index ? "bg-[#ded2be]" : "bg-beige"
                      }`}
                      onMouseDown={() => setSearchTerm(cocktail.name)}
                    >
                      <div className="font-medium">{highlightMatch(cocktail.name, searchTerm)}</div>

                      <div className="text-xs italic">
                        {cocktail.ingredients
                          .filter(
                            (ing) =>
                              ing.ingredient &&
                              ing.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((ing, ingIndex) => (
                            <span key={ingIndex}>
                              {ingIndex > 0 && ", "}{" "}
                              {ing.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                                <span className="font-normal">
                                  {highlightMatch(ing.ingredient, searchTerm)}
                                </span>
                              ) : (
                                <span>{ing.ingredient}</span>
                              )}
                            </span>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {showFilters && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
                <div className="w-3/4 max-w-sm bg-darkGreen p-6 shadow-lg transform transition-transform translate-x-0">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg m-0 text-beige">Filters</p>
                    <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="mt-4">
                    <label className="hidden text-sm font-medium mb-2 text-beige">Category</label>
                    <div className="border border-beige max-h-60 overflow-auto">
                      <div
                        className={`cursor-pointer px-4 py-2 text-sm flex justify-between hover:bg-[#ebdcc6] hover:text-darkGreen ${
                          selectedCategory === "" ? "bg-[#ebdcc6] text-darkGreen" : "text-beige"
                        }`}
                        onClick={() => setSelectedCategory("")}
                      >
                        All Categories
                      </div>

                      {categories
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((cat, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer px-4 py-2 text-sm flex justify-between hover:bg-[#ebdcc6] hover:text-darkGreen ${
                              selectedCategory === cat.name
                                ? "bg-[#ebdcc6] text-darkGreen"
                                : "text-beige"
                            }`}
                            onClick={() => setSelectedCategory(cat.name)}
                          >
                            {cat.name}{" "}
                            <span className="ml-2 text-xs opacity-75">({cat.count})</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="hidden text-sm font-medium mb-2 text-beige">
                      Ingredients
                    </label>
                    <div className="border border-beige max-h-60 overflow-auto">
                      <div
                        className={`cursor-pointer px-4 py-2 text-sm  flex justify-between hover:bg-[#ebdcc6] hover:text-darkGreen ${
                          selectedIngredients.length === 0
                            ? "bg-[#ebdcc6] text-darkGreen"
                            : "text-beige"
                        }`}
                        onClick={() => setSelectedIngredients([])}
                      >
                        All Ingredients
                      </div>

                      {ingredients
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((ing, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer px-4 py-2 text-sm  flex justify-between hover:bg-[#ebdcc6] hover:text-darkGreen ${
                              selectedIngredients.includes(ing.name)
                                ? "bg-[#ebdcc6] text-darkGreen"
                                : "text-beige"
                            }`}
                            onClick={() => toggleIngredient(ing.name)}
                          >
                            {ing.name}{" "}
                            <span className="ml-2 text-xs opacity-75">({ing.count})</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setSelectedIngredients([]);
                        setShowFilters(false);
                      }}
                      className="px-4 py-2 border border-beige text-beige transition hover:bg-beige hover:text-darkGreen"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 bg-beige text-darkGreen transition hover:bg-opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredCocktails.length > 0 ? (
                filteredCocktails.map((cocktail, index) => (
                  <CocktailCard key={index} cocktail={cocktail} />
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

function highlightMatch(text: string, query: string) {
  if (!query || !text) return text; 

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="font-semibold text-bordeaux">
        {part}
      </span>
    ) : (
      part
    )
  );
}
