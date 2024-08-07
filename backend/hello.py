import os
from flask import Flask
import mysql.connector


class DBManager:
    def __init__(self, database='example', host="db", user="root", password_file=None):
        pf = open(password_file, 'r')
        self.connection = mysql.connector.connect(
            user=user, 
            password=pf.read(),
            host=host, # name of the mysql service as set in the docker compose file
            database=database,
            auth_plugin='mysql_native_password'
        )
        pf.close()
        self.cursor = self.connection.cursor()
    
    def populate_db(self):
        self.cursor.execute('DROP TABLE IF EXISTS blog')
        self.cursor.execute('CREATE TABLE blog (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255))')
        self.cursor.executemany('INSERT INTO blog (id, title) VALUES (%s, %s);', [(i, 'Blog post #%d'% i) for i in range (1,5)])
        
        self.cursor.execute('DROP TABLE IF EXISTS cards')
        self.cursor.execute('CREATE TABLE cards (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), info VARCHAR(255), price INT)')
        self.cursor.executemany('INSERT INTO cards (id, title, info, price) VALUES (%s, %s, %s, %s);', [(i, 'Card #%d'% i, 'This is card #%d'% i, i*100) for i in range (1,5)])

        self.connection.commit()
    
    def query_titles(self):
        self.cursor.execute('SELECT title FROM blog')
        rec = []
        for c in self.cursor:
            rec.append(c[0])
        return rec
    
    def query_cards(self):
        self.cursor.execute('SELECT title, info, price FROM cards')
        rec = []
        for c in self.cursor:
            rec.append(c)
        return rec


server = Flask(__name__)
conn = None

@server.route('/')
def listBlog():
    global conn
    if not conn:
        conn = DBManager(password_file='/run/secrets/db-password')
        conn.populate_db()
    rec = conn.query_titles()

    response = ''
    for c in rec:
        response = response  + '<div>   Hello  ' + c + '</div>'
    return response

@server.route('/cards')
def listCards():
    global conn
    if not conn:
        conn = DBManager(password_file='/run/secrets/db-password')
        conn.populate_db()
    rec = conn.query_cards()

    # return as json
    response = []
    for c in rec:
        response.append({'title': c[0], 'info': c[1], 'price': c[2]})
    return {'cards': response}

if __name__ == '__main__':
    server.run()
