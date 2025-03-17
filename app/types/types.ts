export interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: { unit?: string; amount?: number; ingredient: string; special?: string }[];
  preparation: string;
}
