import os
from flask import Flask
from src.dbmanager import DBManager


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


if __name__ == "__main__":
    server.run()
