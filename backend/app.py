import os
from flask import Flask
from src.dbmanager import DBManager


server = Flask(__name__)
conn = None


def connect_db():
    global conn
    if not conn:
        conn = DBManager(password_file="/run/secrets/db-password")
        # conn.populate_db()
    return conn


def reconnect_db():
    global conn
    conn = DBManager(password_file="/run/secrets/db-password")
    # conn.populate_db()


@server.route("/cards")
def listCards():
    global conn
    conn = connect_db()
    try:
        rec = conn.query_cards()
    except:
        reconnect_db()
        rec = conn.query_cards()

    # return as json
    response = []
    for c in rec:
        response.append({"id": c[0], "title": c[1], "info": c[2], "price": c[3]})
    return {"cards": response}


@server.route("/cards/<int:id>")
def getCard(id):
    global conn
    conn = connect_db()
    try:
        rec = conn.query_card(id)
    except:
        reconnect_db()
        rec = conn.query_card(id)

    # return as json
    return {"card": {"id": rec[0], "title": rec[1], "info": rec[2], "price": rec[3], "imageURL": rec[4]}}


if __name__ == "__main__":
    server.run()
