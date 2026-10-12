from flask import Blueprint, jsonify, request
from ..extensions import db

waiter_bp = Blueprint("waiter", __name__, url_prefix="/api/waiter")

# The four stages an order moves through, in order
ORDER_STATUSES = ["PENDING", "PREPARING", "READY", "SERVED"]