import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, send_file, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)
print("Conexion exitosa")

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
        """)
        result = cursor.fetchall()
        json_result = result[0][0]
        return jsonify(json_result)

@app.route("/image")
def data():
    nombre = request.args.get('nombre')
    try: 
        return send_file(f"images/{nombre}", mimetype='image/png')
    except Exception as e:
        print(e)
        return send_file(f"images/404.png", mimetype='image/*')

@app.route("/likes")
def get_likes():
    with connection.cursor() as cursor:
        reqId = request.args.get('id')
        cursor.execute(f"SELECT likes FROM articulos WHERE id = {reqId}")
        result = cursor.fetchall()
        json_result = result[0][0]
        return jsonify(json_result)

@app.route('/upload', methods=['POST'])
def upload_file():
    title = request.form.get('title')
    if not title:
        return jsonify({'error': 'No title provided'}), 400
    else:
        return jsonify({
            'message': 'solicitud aceptada',
            'title': title
        })