import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMealById } from "../services/api";
import Loading from "../components/menu/Loading";
import ErrorMessage from "../components/menu/ErrorMessage";

function FoodDetails() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="food-details">

  
      <img src={meal.image} alt={meal.name} />
  
      <h1>{meal.name}</h1>
  
      <p>Category: {meal.category}</p>
  
      <p>KSh {meal.price}</p>
  
      <h2>About this meal</h2>
  
      <p>{meal.description}</p>
  
      <h2>Ingredients</h2>
  
      <ul>
        {meal.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <button><Link to="/menu" className="back-button">
        Back to Menu
      </Link>
        </button>
      <button>Add to Cart</button>
    </main>
  );
}

export default FoodDetails;