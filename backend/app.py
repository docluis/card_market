import os
from flask import Flask, request, jsonify
from src.dbmanager import DBManager
from src.jwt import token_required


server = Flask(__name__)
conn = None


def connect_db(conn):
    # global conn
    if not conn:
        conn = DBManager(password_file="/run/secrets/db-password")
        # conn.populate_db()
    return conn


# add route for all cards with pagination, so parameter for page and size
@server.route("/cards/<int:page>/<int:size>")
def getCards(page, size):
    global conn
    conn = connect_db(conn)
    recs = conn.query_cards(page, size)

    # return as json
    return {
        "cards": [
            {
                "id": rec[0],
                "title": rec[1],
                "info": rec[2],
                "price": rec[3],
                "imageURL": rec[4],
            }
            for rec in recs
        ]
    }


@server.route("/card/<int:id>")
def getCard(id):
    global conn
    conn = connect_db(conn)
    rec = conn.query_card(id)

    import time

    time.sleep(1)

    # return as json
    return {
        "card": {
            "id": rec[0],
            "title": rec[1],
            "info": rec[2],
            "price": rec[3],
            "imageURL": rec[4],
        }
    }


# search cards
@server.route("/search/<string:search_term>/<int:size>")
def searchCard(search_term, size):
    global conn
    conn = connect_db(conn)
    recs = conn.search_card(search_term, size)

    # return as json
    return {
        "cards": [
            {
                "id": rec[0],
                "title": rec[1],
                "info": rec[2],
                "price": rec[3],
                "imageURL": rec[4],
            }
            for rec in recs
        ]
    }


# register user with email, username and password in body
@server.route("/register", methods=["POST"])
def register():
    global conn
    conn = connect_db(conn)
    data = request.json
    success = conn.create_user(data["email"], data["username"], data["password"])
    if success:
        return {"message": "User created"}, 201
    else:
        return {"message": "User creation failed"}, 400


# login user with username and password in body
@server.route("/login", methods=["POST"])
def login():
    global conn
    conn = connect_db(conn)
    data = request.json
    print(data)
    token = conn.login(data["username"], data["password"])
    if token:
        response = jsonify({"message": "Login successful"})
        response.status_code = 200
        # set cookie with token
        response.set_cookie(key="auth_token", value=token, httponly=True)

        return response
    else:
        return {"message": "Login failed"}, 401


# logout user
@server.route("/logout", methods=["POST"])
@token_required
def logout(current_user):
    token = request.cookies.get("auth_token")
    if token:
        response = jsonify({"message": "Logout successful"})
        response.status_code = 200
        # remove cookie
        response.set_cookie(key="auth_token", value="", expires=0)

        return response


# get all users
@server.route("/users")
def getUsers():
    global conn
    conn = connect_db(conn)
    recs = conn.get_users()

    # return as json
    return {
        "users": [{"id": rec[0], "email": rec[1], "username": rec[2]} for rec in recs]
    }


@server.route("/me", methods=["GET"])
@token_required
def me(current_user):
    global conn
    conn = connect_db(conn)
    rec = conn.get_user(current_user)

    if rec:
        return jsonify(
            {
                "user": {
                    "id": rec[0],
                    "email": rec[1],
                    "username": rec[2],
                    "address_street": rec[3],
                    "address_number": rec[4],
                    "address_extra": rec[5],
                    "address_zip": rec[6],
                    "address_city": rec[7],
                    "address_country": rec[8],
                    "full_name": rec[9],
                }
            }
        )
    else:
        return {"message": "User not found"}, 404


@server.route("/me", methods=["PUT"])
@token_required
def update_user(current_user):
    global conn
    conn = connect_db(conn)
    data = request.json
    user = data["user"]
    success = conn.update_user(
        current_user,
        user["full_name"],
        user["address_street"],
        user["address_number"],
        user["address_extra"],
        user["address_zip"],
        user["address_city"],
        user["address_country"],
    )
    if success:
        return {"message": "User updated"}, 200
    else:
        return {"message": "User update failed"}, 400

@server.route("/help", methods=["POST"])
def create_help_message():
    global conn
    conn = connect_db(conn)
    data = request.json
    success = conn.create_help_message(data["message"], data["email"], data["name"])
    if success:
        return {"message": "Help message created"}, 201
    else:
        return {"message": "Help message creation failed"}, 400


if __name__ == "__main__":
    server.run()
