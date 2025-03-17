"use client";

interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: { unit?: string; amount?: number; ingredient: string; special?: string }[];
  preparation: string;
}

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return(
    <div className="p-4 border border-bordeaux transition duration-300 ease-in-out hover:bg-bordeaux/10 hover:-translate-y-1">
        <h3 className="text-lg">{cocktail.name}</h3>
        <p className="text-sm">{cocktail.category}</p>
        <img src={cocktail.image} alt={cocktail.name} className="w-full h-96 object-cover object-center rounded md:h-64 lg:h-80" />
        
        <h4 className="mt-3 text-md font-semibold text-bordeaux">Ingredients:</h4>
          <ul className="text-sm text-gray-700">
            {cocktail.ingredients.map((ing, index) => (
              <li key={index}>
                {ing.amount ? `${ing.amount} ${ing.unit} ` : ""}
                {ing.ingredient}
                {ing.special ? ` (${ing.special})` : ""}
              </li>
            ))}
          </ul>

          <h4 className="mt-3 text-md font-semibold text-bordeaux">Preparation:</h4>
          {cocktail.preparation && cocktail.preparation.includes(".") ? (
            <ul className="list-none text-sm text-gray-700">
              {cocktail.preparation.split('. ').map((sentence, index, arr) => (
                sentence.trim() && (
                  <li key={index} className="before:content-['-'] before:mr-2">
                    {sentence}{index !== arr.length - 1 && '.'}
                  </li>
                )
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700">{cocktail.preparation}</p>
          )}
      </div>
  );
}