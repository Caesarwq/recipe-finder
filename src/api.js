
const API_KEY = 'b564a3113f4c41bab793ed6de4cb07ad';

export const fetchRecipes = async (ingredients, filters = {}) => {
  try {
    const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
    const params = new URLSearchParams({
      includeIngredients: ingredients.join(','),
      number: 6,
      addRecipeInformation: 'true',
      instructionsRequired: 'true',
      apiKey: API_KEY
    });

    if (filters.vegan) params.append('diet', 'vegan');
    else if (filters.vegetarian) params.append('diet', 'vegetarian');

    if (filters.glutenFree) params.append('intolerances', 'gluten');
    if (filters.dairyFree) {
      const existing = params.get('intolerances');
      params.set('intolerances', existing ? `${existing},dairy` : 'dairy');
    }

    const response = await fetch(`${baseUrl}?${params.toString()}`);

    if (!response.ok) {
      console.error("API error:", response.status);
      return [];
    }

    const data = await response.json();

    const recipes = data.results.map((detail) => ({
      id: detail.id,
      title: detail.title || "No title",
      summary: detail.summary || "",
      image: detail.image || "",
      glutenFree: detail.glutenFree,
      vegan: detail.vegan,
      vegetarian: detail.vegetarian,
      dairyFree: detail.dairyFree,
      veryHealthy: detail.veryHealthy,
      cheap: detail.cheap,
      readyInMinutes: detail.readyInMinutes,
      calories: detail.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || null
    }));

    return recipes;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return [];
  }
};
