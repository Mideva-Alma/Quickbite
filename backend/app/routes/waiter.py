from flask import Blueprint, jsonify, request

from ..extensions import db
from ..models.order import Order

waiter_bp = Blueprint(
    "waiter",
    __name__,
    url_prefix="/api/waiter",
)

ORDER_STATUSES = ["Pending", "Preparing", "Ready", "Served"]


def serialize_order(order):
    return {
        "id": order.id,
        "customer": order.customer_name,
        "table_number": order.table_number,
        "total_amount": float(order.total),
        "payment_method": order.payment_method,
        "payment_status": order.payment_status,
        "status": order.order_status,
        "items": [
            {
                "name": item.item_name,
                "quantity": item.quantity,
            }
            for item in order.items
        ],
    }


@waiter_bp.route("/orders", methods=["GET"])
def get_orders():
    query = Order.query

    status = request.args.get("status")

    if status:
        normalized_status = next(
            (
                allowed
                for allowed in ORDER_STATUSES
                if allowed.lower() == status.strip().lower()
            ),
            None,
        )

        if normalized_status is None:
            return jsonify({"error": "Invalid status"}), 400

        query = query.filter_by(order_status=normalized_status)

    orders = query.order_by(Order.id.desc()).all()

    return jsonify([serialize_order(order) for order in orders]), 200


@waiter_bp.route("/orders/<int:order_id>/status", methods=["PATCH"])
def update_order_status(order_id):
    order = db.session.get(Order, order_id)

    if order is None:
        return jsonify({"error": "Order not found"}), 404

    data = request.get_json(silent=True) or {}
    requested_status = data.get("status")

    if not isinstance(requested_status, str):
        return jsonify({"error": "A valid status is required"}), 400

    new_status = next(
        (
            allowed
            for allowed in ORDER_STATUSES
            if allowed.lower() == requested_status.strip().lower()
        ),
        None,
    )

    if new_status is None:
        return jsonify({"error": "Invalid status"}), 400

    if order.order_status not in ORDER_STATUSES:
        return jsonify({"error": "Order has an unknown status"}), 400

    current_index = ORDER_STATUSES.index(order.order_status)
    new_index = ORDER_STATUSES.index(new_status)

    if new_index != current_index + 1:
        return jsonify(
            {"error": "Status must move to the next stage"}
        ), 400

    order.order_status = new_status

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Could not update order status"}), 500

    return jsonify(serialize_order(order)), 200
