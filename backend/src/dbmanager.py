import os
import time
import bcrypt
import mysql.connector

from src.jwt import generate_jwt_token
from src.example_cards import cards
from contextlib import contextmanager


class DBManager:
    def __init__(self, database="example", host="db", user="root", password_file=None):
        if password_file is None or not os.path.exists(password_file):
            raise ValueError("Password file is required and must exist.")

        with open(password_file, "r") as pf:
            password = pf.read().strip()

        self.connection_config = {
            "user": user,
            "password": password,
            "host": host,
            "database": database,
            "auth_plugin": "mysql_native_password",
            "pool_name": "mypool",
            "pool_size": 5,
        }
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
            cursor.execute("DROP TABLE IF EXISTS cards")

            cursor.execute(
                """
                CREATE TABLE cards (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255),
                    info VARCHAR(255),
                    price INT,
                    imageURL VARCHAR(255)
                )
                """
            )
            cursor.executemany(
                "INSERT INTO cards (title, info, price, imageURL) VALUES (%s, %s, %s, %s)",
                cards,
            )
            cursor._connection.commit()

        with self.get_cursor() as cursor:
            cursor.execute("DROP TABLE IF EXISTS users")
            
            cursor.execute(
                """
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) UNIQUE,
                    username VARCHAR(255),
                    password VARCHAR(255),
                    salt VARCHAR(255)
                )
                """
            )
            cursor._connection.commit()

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

    def create_user(self, email, username, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)

        try:
            with self.get_cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO users (email, username, password, salt)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (
                        email,
                        username,
                        hashed_password.decode("utf-8"),
                        salt.decode("utf-8"),
                    ),
                )
                cursor._connection.commit()
            return True
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return False

    def get_users(self):
        with self.get_cursor() as cursor:
            cursor.execute("SELECT id, email, username FROM users")
            return cursor.fetchall()

    # function for login
    def login(self, username, password):
        with self.get_cursor() as cursor:
            cursor.execute(
                "SELECT password, salt FROM users WHERE username = %s", (username,)
            )
            user = cursor.fetchone()
            if user:
                hashed_password = bcrypt.hashpw(
                    password.encode("utf-8"), user[1].encode("utf-8")
                )
                if hashed_password == user[0].encode("utf-8"):
                    data = {"username": username}
                    return generate_jwt_token(data)
        return None
