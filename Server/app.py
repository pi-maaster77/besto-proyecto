import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, send_file, request
from flask_cors import CORS

# Cargamos las variables de entorno desde el archivo .env
load_dotenv()

# Creamos una instancia de la aplicación Flask
app = Flask(__name__)
# Habilitamos CORS (Cross-Origin Resource Sharing) para la aplicación
CORS(app)

# Obtenemos la URL de la base de datos desde las variables de entorno
url = os.getenv("DATABASE_URL")
# Establecemos la conexión a la base de datos
connection = psycopg2.connect(url)
print("Conexión exitosa")

# Configuración de la carpeta de subida
app.config['UPLOAD_FOLDER'] = 'uploads'

# Crea la carpeta de subidas si no existe
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


@app.route("/articles")
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
    if 'image' not in request.files:
        print("No se seleccionó ningún archivo")
        return "No se seleccionó ningún archivo", 400
    file = request.files['image']

    if file.filename == '':
        print("No se seleccionó ningún archivo")
        return "No se seleccionó ningún archivo", 400

    if file:
        filename = file.filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        print(f"Archivo subido con éxito: {filename}")
        return f"Archivo subido con éxito: {filename}", 200

@app.route('/login', methods=['POST'])
def login():
    user = request.form.get('user')
    passwd = request.form.get('passwd')
    print(f"user: {user}")
    print(f"passwd: {passwd}")

    with connection.cursor() as cursor:
        query = "SELECT * FROM users WHERE username = %s AND password = %s"
        cursor.execute(query, (user, passwd))
        result = cursor.fetchone()
        json_result = result
        return jsonify(json_result)

@app.route('/register', methods=['POST'])
def register():
    user = request.form.get('user')
    passwd = request.form.get('passwd')
    print(f"user: {user}")
    print(f"passwd: {passwd}")
    try:
        with connection.cursor() as cursor:
            query = "INSERT INTO users (username, password) VALUES (%s, %s)"
            cursor.execute(query, (user, passwd))
            connection.commit()
            return jsonify({"message": "ok"})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
