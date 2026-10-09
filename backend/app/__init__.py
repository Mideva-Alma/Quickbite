from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import db, migrate
from .routes.menu_items import menu_items_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)

    app.register_blueprint(menu_items_bp)

    return app