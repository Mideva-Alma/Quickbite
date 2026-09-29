function FoodCard({ food }) {
    return (
      <div className="food-card">
        <img src={food.image} alt={food.name} />
  
        <div>
          <h3>{food.name}</h3>
          <p>{food.category}</p>
          <p>KSh {food.price}</p>
        </div>
      </div>
    );
  }
  
  export default FoodCard;