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
    <main>
      <h1>QUICKBITE Menu</h1>

      <Link to="/cart">
        View Cart
      </Link>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="menu-grid">
        {filteredMeals.map((meal) => (
          <FoodCard key={meal.id} food={meal} />
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <p>No meals found.</p>
      )}
    </main>
  );
}

export default Menu;