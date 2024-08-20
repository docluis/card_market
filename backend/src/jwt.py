import jwt
import datetime
from functools import wraps
from flask import request, jsonify

SECRET_KEY = "secret_test_key_bgk23074b892375gi7892b3jbk9hs"


def generate_jwt_token(data):
    payload = {
        "data": data,
        "exp": datetime.datetime.now() + datetime.timedelta(days=1),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # token in cookies
        token = request.cookies.get("auth_token")
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data["data"]["username"]
        except:
            return jsonify({"message": "Token is invalid!"}), 403
        return f(current_user, *args, **kwargs)

    return decorated
