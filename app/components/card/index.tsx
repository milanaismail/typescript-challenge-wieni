"use client";

import { Cocktail } from "../../types/types";
import "../../globals.css";

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <div className="p-4 border border-bordeaux transition duration-300 ease-in-out hover:bg-bordeaux/10 hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <p className="text-lg m-0">{cocktail.name}</p>
        <p className="text-sm text-beige m-0 bg-highlight py-2 px-3 w-fit rounded-full">
          {cocktail.category}
        </p>
      </div>
      <img
        src={cocktail.image}
        alt={cocktail.name}
        className="w-full h-96 object-cover object-center rounded my-3 md:h-64 lg:h-80"
      />

      <p className="text-md font-semibold text-bordeaux">Ingredients:</p>
      <ul className="text-sm">
        {cocktail.ingredients.map((ing, index) => (
          <li key={index}>
            {ing.amount ? `${ing.amount} ${ing.unit} ` : ""}
            {ing.ingredient}
          </li>
        ))}
      </ul>
      {cocktail.ingredients.some((ing) => ing.special) && (
        <>
          <p className=" mb-0 text-sm italic">Optional:</p>
          <ul className="text-sm ">
            {cocktail.ingredients
              .filter((ing) => ing.special)
              .map((ing, index) => (
                <li key={index}>{ing.special}</li>
              ))}
          </ul>
        </>
      )}
      <p className=" text-md font-semibold text-bordeaux">Preparation:</p>
      {cocktail.preparation && cocktail.preparation.includes(".") ? (
        <ul className="list-none text-sm ">
          {cocktail.preparation.split(". ").map(
            (sentence, index, arr) =>
              sentence.trim() && (
                <li key={index} className="before:content-['-'] before:mr-2">
                  {sentence}
                  {index !== arr.length - 1 && "."}
                </li>
              )
          )}
        </ul>
      ) : (
        <p className="text-sm ">{cocktail.preparation}</p>
      )}
      {cocktail.garnish && (
        <div>
          <p className="text-md font-semibold text-bordeaux">Finishing touch:</p>
          <ul className="text-sm">
            <li className="">{cocktail.garnish}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
