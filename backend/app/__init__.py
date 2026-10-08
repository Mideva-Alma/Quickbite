from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import db, migrate


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)

    return app
