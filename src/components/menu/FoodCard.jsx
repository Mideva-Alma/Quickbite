import { Link } from "react-router-dom";

function FoodCard({ food }) {
  return (
    <div className="food-card">
      <Link to={`/menu/${food.id}`}>
        <img src={food.image} alt={food.name} />

        <div>
          <h3>{food.name}</h3>
          <p>{food.category}</p>
          <p>KSh {food.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default FoodCard;         