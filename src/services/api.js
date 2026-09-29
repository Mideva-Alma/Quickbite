const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const getMealPrice = (category) => {
  const categoryPrices = {
    Chicken: 450,
    Beef: 550,
    Lamb: 600,
    Pork: 500,
    Seafood: 650,
    Pasta: 400,
    Dessert: 300,
    Vegetarian: 350,
    Vegan: 350,
    Breakfast: 300,
    Starter: 250,
    Side: 200,
    Miscellaneous: 400,
    Goat: 550,
  };

  return categoryPrices[category] || 450;
};

// Fetch all meals from multiple categories
export const getMeals = async () => {
  const categories = [
    "Chicken",
    "Beef",
    "Seafood",
    "Pasta",
    "Vegetarian",
    "Dessert",
    "Breakfast",
    "Lamb",
    "Goat",
    "Miscellaneous",
  ];

  try {
    const requests = categories.map(async (category) => {
      const response = await fetch(
        `${API_BASE_URL}/filter.php?c=${category}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} meals`);
      }

      const data = await response.json();

      return (data.meals || []).map((meal) => ({
        id: Number(meal.idMeal),
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: category,
        price: getMealPrice(category),
      }));
    });

    const results = await Promise.all(requests);

    const meals = results.flat();

    const uniqueMeals = Array.from(
      new Map(meals.map((meal) => [meal.id, meal])).values()
    );

    return uniqueMeals;
  } catch (error) {
    throw new Error("Failed to load menu");
  }
};

// Fetch one specific meal
export const getMealById = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/lookup.php?i=${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meal details");
  }

  const data = await response.json();

  const meal = data.meals?.[0];

  if (!meal) {
    throw new Error("Meal not found");
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient.trim());
    }
  }

  return {
    id: Number(meal.idMeal),
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    price: getMealPrice(meal.strCategory),
    description: `A delicious ${meal.strCategory.toLowerCase()} dish prepared with ${ingredients
      .slice(0, 3)
      .join(", ")} and other flavorful ingredients.`,
    ingredients,
  };
};