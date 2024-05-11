import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, send_file
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)
print("conexion exitosa")


@app.route("/")
def route():
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT json_agg(json_build_object(
                'id', id, 
                'image', img, 
                'title', title
                )) AS articulos 
            FROM articulos;
        """
        )
        result = cursor.fetchall()
        # Accede al primer elemento de la lista (el JSON agregado)
        json_result = result[0][0]
        return jsonify(json_result)

@app.route("/data")
def data():
    return send_file("./icon.png", mimetype='image/jpg')