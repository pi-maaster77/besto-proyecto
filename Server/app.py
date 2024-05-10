import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask

load_dotenv()

app = Flask(__name__)
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)


@app.get("/")
def get_articles():
    with connection.cursor() as cursor:
        a = cursor.execute("SELECT * FROM articulos;")
    print(a)
    return str(a)
