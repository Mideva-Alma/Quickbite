const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getMeals = async () => {
  const response = await fetch(`${API_BASE_URL}/search.php?s=`);

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  const data = await response.json();

  const meals = data.meals || [];

  return meals.map((meal) => ({
    id: Number(meal.idMeal),
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    price: 450,
  }));
};