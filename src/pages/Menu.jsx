import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMeals } from "../services/api";
import FoodCard from "../components/menu/FoodCard";
import Loading from "../components/menu/Loading";
import ErrorMessage from "../components/menu/ErrorMessage";
import SearchBar from "../components/menu/SearchBar";
import CategoryFilter from "../components/menu/CategoryFilter";

function Menu() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMeals();
        setMeals(data);
      } catch (error) {
        setError("Unable to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const categories = [
    ...new Set(meals.map((meal) => meal.category)),
  ];

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      meal.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          QUICKBITE <span className="text-red-500">Menu</span>
        </h1>

        <Link
          to="/cart"
          className="w-fit rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          View Cart
        </Link>
      </div>

      {/* Search and Category Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Menu */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredMeals.map((meal) => (
          <FoodCard key={meal.id} food={meal} />
        ))}
      </div>

      {/* No Results */}
      {filteredMeals.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          No meals found.
        </p>
      )}
    </main>
  );
}

export default Menu;

