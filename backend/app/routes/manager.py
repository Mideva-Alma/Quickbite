from flask import Blueprint, jsonify, request
from ..extensions import db
from ..models.menu_item import MenuItem

manager_bp = Blueprint("manager", __name__, url_prefix="/api/manager")


@manager_bp.route("/food-of-the-day", methods=["GET"])
def get_food_of_the_day():
    meal = MenuItem.query.filter_by(is_food_of_day=True).first()

    if not meal:
        return jsonify({"message": "No Food of the Day selected"}), 404

    return jsonify({
        "id": meal.id,
        "name": meal.name,
        "description": meal.description,
        "price": meal.price,
        "image": meal.image,
        "category": meal.category,
        "ingredients": meal.ingredients or [],
        "availability": meal.availability,
        "is_food_of_day": meal.is_food_of_day,
    }), 200


@manager_bp.route("/food-of-the-day", methods=["PUT"])
def set_food_of_the_day():
    data = request.get_json(silent=True) or {}
    meal_id = data.get("meal_id")

    if meal_id is None:
        return jsonify({"error": "meal_id is required"}), 400

    meal = db.session.get(MenuItem, meal_id)

    if not meal:
        return jsonify({"error": "Menu item not found"}), 404

    if not meal.availability:
        return jsonify({"error": "Cannot select an unavailable meal"}), 400

    MenuItem.query.update({MenuItem.is_food_of_day: False})
    meal.is_food_of_day = True
    db.session.commit()

    return jsonify({
        "message": "Food of the Day updated successfully",
        "meal_id": meal.id,
        "name": meal.name,
    }), 200