import os
import time
import mysql.connector

from src.example_cards import cards
from contextlib import contextmanager

class DBManager:
    def __init__(self, database="example", host="db", user="root", password_file=None):
        pf = open(password_file, "r")
        self.connection_config = {
            "user": user,
            "password": pf.read(),
            "host": host,
            "database": database,
            "auth_plugin": "mysql_native_password",
            "pool_name": "mypool",
            "pool_size": 5,
        }
        pf.close()
        self.populate_db()

    @contextmanager
    def get_cursor(self):
        connection = mysql.connector.connect(**self.connection_config)
        cursor = connection.cursor(buffered=True)
        try:
            yield cursor
        finally:
            cursor.close()
            connection.close()

    def populate_db(self):
        with self.get_cursor() as cursor:
            cursor.execute(
                "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'cards'"
            )
            table_exists = cursor.fetchone()[0]

            if not table_exists:
                cursor.execute(
                    "CREATE TABLE cards (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), info VARCHAR(255), price INT, imageURL VARCHAR(255))"
                )
                cursor.executemany(
                    "INSERT INTO cards (title, info, price, imageURL) VALUES (%s, %s, %s, %s);",
                    cards,
                )
                cursor.connection.commit()

    def query_cards(self, page, size):
        with self.get_cursor() as cursor:
            cursor.execute(
                "SELECT id, title, info, price, imageURL FROM cards LIMIT %s OFFSET %s",
                (size, page * size),
            )
            return cursor.fetchall()

    def query_card(self, id):
        with self.get_cursor() as cursor:
            cursor.execute(
                "SELECT id, title, info, price, imageURL FROM cards WHERE id = %s",
                (id,),
            )
            return cursor.fetchone()

    def search_card(self, search_term, size):
        with self.get_cursor() as cursor:
            cursor.execute(
                "SELECT id, title, info, price, imageURL FROM cards WHERE title LIKE %s LIMIT %s",
                ("%" + search_term + "%", size),
            )
            return cursor.fetchall()
