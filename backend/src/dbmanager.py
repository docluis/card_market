import mysql.connector

class DBManager:
    def __init__(self, database="example", host="db", user="root", password_file=None):
        pf = open(password_file, "r")
        self.connection = mysql.connector.connect(
            user=user,
            password=pf.read(),
            host=host,  # name of the mysql service as set in the docker compose file
            database=database,
            auth_plugin="mysql_native_password",
        )
        pf.close()
        self.cursor = self.connection.cursor()
        self.populate_db()

    def populate_db(self):
        self.cursor.execute("DROP TABLE IF EXISTS cards")
        self.cursor.execute(
            "CREATE TABLE cards (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), info VARCHAR(255), price INT, imageURL VARCHAR(255))"
        )
        self.cursor.executemany(
            "INSERT INTO cards (id, title, info, price, imageURL) VALUES (%s, %s, %s, %s, %s);",
            [
                (i, "Card #%d" % i, "This is card #%d" % i, i * 1, "/5093.jpg")
                for i in range(1, 15)
            ],
        )

        self.connection.commit()

    def query_cards(self):
        self.cursor.execute("SELECT id, title, info, price FROM cards")
        rec = []
        for c in self.cursor:
            rec.append(c)
        return rec

    def query_card(self, id):
        self.cursor.execute(
            "SELECT id, title, info, price, imageURL FROM cards WHERE id = %s", (id,)
        )
        rec = self.cursor.fetchone()
        return rec
