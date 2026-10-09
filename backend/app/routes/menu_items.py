
from flask import Blueprint, jsonify, request
from ..extensions import db
from ..models.menu_item import MenuItem

menu_items_bp = Blueprint("menu_items", __name__, url_prefix="/api/menu-items")


def serialize_item(item):
    return {
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "image": item.image,
        "category": item.category,
        "ingredients": item.ingredients or [],
        "availability": item.availability,
    }


@menu_items_bp.route("", methods=["GET"])
def get_menu_items():
    items = MenuItem.query.order_by(MenuItem.id).all()
    return jsonify([serialize_item(item) for item in items]), 200


@menu_items_bp.route("", methods=["POST"])
def create_menu_item():
    data = request.get_json(silent=True) or {}

    if not data.get("name") or data.get("price") is None:
        return jsonify({"error": "Name and price are required"}), 400

    try:
        price = float(data["price"])
        if price < 0:
            raise ValueError
    except (TypeError, ValueError):
        return jsonify({"error": "Price must be a non-negative number"}), 400

    ingredients = data.get("ingredients", [])
    if not isinstance(ingredients, list):
        return jsonify({"error": "Ingredients must be a list"}), 400

    item = MenuItem(
        name=data["name"].strip(),
        description=data.get("description", ""),
        price=price,
        image=data.get("image", ""),
        category=data.get("category") or "Miscellaneous",
        ingredients=ingredients,
        availability=data.get("availability", True),
    )

    db.session.add(item)
    db.session.commit()
    return jsonify(serialize_item(item)), 201


@menu_items_bp.route("/<int:item_id>", methods=["GET"])
def get_menu_item(item_id):
    item = db.get_or_404(MenuItem, item_id)
    return jsonify(serialize_item(item)), 200


@menu_items_bp.route("/<int:item_id>", methods=["PATCH"])
def update_menu_item(item_id):
    item = db.get_or_404(MenuItem, item_id)
    data = request.get_json(silent=True) or {}

    if "price" in data:
        try:
            price = float(data["price"])
            if price < 0:
                raise ValueError
            item.price = price
        except (TypeError, ValueError):
            return jsonify({"error": "Price must be a non-negative number"}), 400

    if "ingredients" in data:
        if not isinstance(data["ingredients"], list):
            return jsonify({"error": "Ingredients must be a list"}), 400
        item.ingredients = data["ingredients"]

    for field in ("name", "description", "image", "category", "availability"):
        if field in data:
            setattr(item, field, data[field])

    db.session.commit()
    return jsonify(serialize_item(item)), 200


@menu_items_bp.route("/<int:item_id>", methods=["DELETE"])
def delete_menu_item(item_id):
    item = db.get_or_404(MenuItem, item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Menu item deleted successfully"}), 200