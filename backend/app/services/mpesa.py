
import requests
from requests.auth import HTTPBasicAuth
from flask import current_app


def get_access_token():
    if current_app.config.get("MPESA_ENVIRONMENT", "sandbox") != "sandbox":
        raise ValueError("Only the Daraja sandbox is configured")

    consumer_key = current_app.config.get("MPESA_CONSUMER_KEY")
    consumer_secret = current_app.config.get("MPESA_CONSUMER_SECRET")

    if not consumer_key or not consumer_secret:
        raise ValueError("Daraja credentials are missing")

    url = (
        "https://sandbox.safaricom.co.ke/"
        "oauth/v1/generate?grant_type=client_credentials"
    )

    response = requests.get(
        url,
        auth=HTTPBasicAuth(consumer_key, consumer_secret),
        timeout=20,
    )
    response.raise_for_status()

    token = response.json().get("access_token")
    if not token:
        raise ValueError("Daraja did not return an access token")

    return token
