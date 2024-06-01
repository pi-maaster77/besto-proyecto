# Importamos las librerías necesarias
import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, send_file, request
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
print("Conexion exitosa")

# Definimos una ruta para el endpoint principal
@app.route("/")
def route():
    # Ejecutamos una consulta SQL para obtener los artículos de la base de datos
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
        # Obtenemos el resultado en formato JSON
        json_result = result[0][0]
        return jsonify(json_result)

# Definimos una ruta para obtener imágenes
@app.route("/image")
def data():
    nombre = request.args.get('nombre')
    try: 
        # Enviamos el archivo de imagen solicitado
        return send_file(f"images/{nombre}", mimetype='image/png')
    except Exception as e:
        print(e)
        # Si ocurre un error, enviamos una imagen de error
        return send_file(f"images/404.png", mimetype='image/*')

# Definimos una ruta para obtener los likes de un artículo
@app.route("/likes")
def get_likes():
    with connection.cursor() as cursor:
        reqId = request.args.get('id')
        cursor.execute(f"SELECT likes FROM articulos WHERE id = {reqId}")
        result = cursor.fetchall()
        # Obtenemos el resultado en formato JSON
        json_result = result[0][0]
        return jsonify(json_result)

# Definimos una ruta para subir un archivo
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

# Definimos una ruta para el login
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
        # Obtenemos el resultado en formato JSON
        json_result = result
        return jsonify(json_result)

# Definimos una ruta para el registro
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
            connection.commit()  # Aseguramos que los cambios se guarden en la base de datos
            return jsonify({"message": "ok"})
    except Exception as e: 
        print(e)
        return jsonify({"error": str(e)})

# Iniciamos la aplicación Flask en el puerto 5000
if __name__ == "__main__":
    app.run(port=5000)
