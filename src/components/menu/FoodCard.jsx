import { Link } from "react-router-dom";

function FoodCard({ food }) {
  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/menu/${food.id}`}
        className="text-inherit no-underline"
      >
        <img
          src={food.image}
          alt={food.name}
          className="h-[200px] w-full object-cover"
        />

        <div className="p-[15px]">
          <h3 className="mt-0 font-bold text-gray-800">
            {food.name}
          </h3>

          <p className="my-2 text-gray-600">
            {food.category}
          </p>

          <p className="my-2 font-bold text-red-500">
            KSh {food.price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default FoodCard;