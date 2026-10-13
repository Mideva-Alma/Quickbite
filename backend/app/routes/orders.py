from flask import Blueprint, jsonify, request

from ..extensions import db
from ..models.menu_item import MenuItem
from ..models.order import Order
from ..models.order_item import OrderItem


orders_bp = Blueprint("orders", __name__, url_prefix="/api/orders")


def serialize_order(order):
    return {
        "id": order.id,
        "customer_name": order.customer_name,
        "phone_number": order.phone_number,
        "table_number": order.table_number,
        "total_amount": order.total_amount,
        "payment_method": order.payment_method,
        "payment_status": order.payment_status,
        "order_status": order.order_status,
        "created_at": (
            order.created_at.isoformat()
            if order.created_at
            else None
        ),
        "items": [
            {
                "id": item.id,
                "menu_item_id": item.menu_item_id,
                "menu_item_name": item.menu_item.name,
                "quantity": item.quantity,
                "price": item.price,
                "subtotal": item.subtotal,
            }
            for item in order.items
        ],
    }


@orders_bp.route("", methods=["POST"])
def create_order():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Request body must be valid JSON."}), 400

    required_fields = [
        "customer_name",
        "phone_number",
        "table_number",
        "payment_method",
        "items",
    ]

    missing_fields = [
        field for field in required_fields if field not in data
    ]

    if missing_fields:
        return jsonify({
            "error": "Missing required fields.",
            "missing_fields": missing_fields,
        }), 400

    customer_name = data["customer_name"]
    phone_number = data["phone_number"]
    payment_method = data["payment_method"]
    table_number = data["table_number"]
    items_data = data["items"]

    if not isinstance(customer_name, str) or not customer_name.strip():
        return jsonify({"error": "Customer name is required."}), 400

    if not isinstance(phone_number, str) or not phone_number.strip():
        return jsonify({"error": "Phone number is required."}), 400

    if (
        isinstance(table_number, bool)
        or not isinstance(table_number, int)
        or table_number < 1
    ):
        return jsonify({"error": "Table number must be a positive integer."}), 400

    if not isinstance(payment_method, str) or not payment_method.strip():
        return jsonify({"error": "Payment method is required."}), 400

    if not isinstance(items_data, list) or not items_data:
        return jsonify({"error": "An order must contain at least one item."}), 400

    try:
        order = Order(
            customer_name=customer_name.strip(),
            phone_number=phone_number.strip(),
            table_number=table_number,
            payment_method=payment_method.strip(),
            total_amount=0.0,
        )

        db.session.add(order)
        db.session.flush()

        total_amount = 0.0

        for item_data in items_data:
            if not isinstance(item_data, dict):
                db.session.rollback()
                return jsonify({"error": "Each item must be a JSON object."}), 400

            menu_item_id = item_data.get("menu_item_id")
            quantity = item_data.get("quantity")

            if (
                isinstance(menu_item_id, bool)
                or not isinstance(menu_item_id, int)
                or menu_item_id < 1
            ):
                db.session.rollback()
                return jsonify({
                    "error": "Each item needs a valid menu_item_id."
                }), 400

            if (
                isinstance(quantity, bool)
                or not isinstance(quantity, int)
                or quantity < 1
            ):
                db.session.rollback()
                return jsonify({
                    "error": "Each item quantity must be a positive integer."
                }), 400

            menu_item = db.session.get(MenuItem, menu_item_id)

            if menu_item is None:
                db.session.rollback()
                return jsonify({
                    "error": f"Menu item {menu_item_id} was not found."
                }), 404

            if not menu_item.availability:
                db.session.rollback()
                return jsonify({
                    "error": f"{menu_item.name} is not currently available."
                }), 400

            subtotal = round(menu_item.price * quantity, 2)
            total_amount += subtotal

            order_item = OrderItem(
                order_id=order.id,
                menu_item_id=menu_item.id,
                quantity=quantity,
                price=menu_item.price,
                subtotal=subtotal,
            )

            db.session.add(order_item)

        order.total_amount = round(total_amount, 2)
        db.session.commit()

        return jsonify({
            "message": "Order created successfully.",
            "order": serialize_order(order),
        }), 201

    except Exception:
        db.session.rollback()
        return jsonify({"error": "Unable to create order."}), 500


@orders_bp.route("", methods=["GET"])
def get_orders():
    orders = Order.query.order_by(Order.id.desc()).all()

    return jsonify([
        serialize_order(order) for order in orders
    ]), 200


@orders_bp.route("/<int:order_id>", methods=["GET"])
def get_order(order_id):
    order = db.session.get(Order, order_id)

    if order is None:
        return jsonify({"error": "Order not found."}), 404

    return jsonify(serialize_order(order)), 200