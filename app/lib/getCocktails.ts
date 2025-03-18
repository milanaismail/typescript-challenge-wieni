export async function getAllCocktails() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/all`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all cocktails");
  }

  return response.json();
}
