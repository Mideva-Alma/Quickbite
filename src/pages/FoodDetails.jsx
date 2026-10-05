import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMealById } from "../services/api";
import Loading from "../components/menu/Loading";
import ErrorMessage from "../components/menu/ErrorMessage";
import { useCart } from "../context/CartContext";

function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const data = await getMealById(id);
        setMeal(data);
      } catch (error) {
        setError("Unable to load meal details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(meal);

    setAdded(true);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-8">

      {/* Added to Cart Popup */}
      {showPopup && (
        <div className="fixed right-6 top-6 z-50 rounded-lg border border-red-500 bg-white px-5 py-4 shadow-lg">
          <p className="font-semibold text-red-500">
            {meal.name} added to cart
          </p>
        </div>
      )}

      <div className="rounded-[10px] bg-white p-6 shadow-sm md:p-8">

        {/* Top Section */}
        <div className="mb-6 flex justify-end">
          <Link
            to="/menu"
            className="rounded-lg border-2 border-red-500 bg-white px-5 py-2.5 font-semibold text-red-500 no-underline transition hover:bg-red-500 hover:text-white"
          >
            Back to Menu
          </Link>
        </div>

        {/* Meal Image */}
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full max-w-[500px] rounded-[10px] object-cover"
        />

        {/* Meal Information */}
        <div className="mt-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            {meal.name}
          </h1>

          <p className="mb-2 text-gray-600">
            <span className="font-semibold">Category:</span>{" "}
            {meal.category}
          </p>

          <p className="mb-6 text-xl font-bold text-red-500">
            KSh {meal.price}
          </p>

          <h2 className="mb-3 text-xl font-bold text-gray-800">
            About this meal
          </h2>

          <p className="mb-6 leading-7 text-gray-600">
            {meal.description}
          </p>

          <h2 className="mb-3 text-xl font-bold text-gray-800">
            Ingredients
          </h2>

          <ul className="mb-8 list-disc space-y-2 pl-6 text-gray-600">
            {meal.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={
              added
                ? "rounded-lg border-2 border-red-500 bg-white px-6 py-3 font-semibold text-red-500 transition"
                : "rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
            }
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default FoodDetails;