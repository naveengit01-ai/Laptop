import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

# Load environment variables from .env file
load_dotenv()

# Create a Flask application instance
app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# --- Database Connection ---
try:
    connection = mysql.connector.connect(
        host=os.getenv("host"),
        user=os.getenv("user"),
        password=os.getenv("password"),
        database=os.getenv("database")
    )
    print("Database connected successfully")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    # Exit if the connection fails
    exit(1)

# --- API Endpoints ---

# GET: Fetch all data from the credentials table
@app.route("/data", methods=['GET'])
def get_all_data():
    try:
        cursor = connection.cursor(dictionary=True) # dictionary=True returns rows as dicts
        cursor.execute("SELECT * FROM credentials")
        result = cursor.fetchall()
        cursor.close()
        return jsonify(result), 200
    except mysql.connector.Error as err:
        return jsonify({"error": f"Something went wrong: {err}"}), 500

# GET: Fetch a specific user's data
@app.route("/get/<user>", methods=['GET'])
def get_user_data(user):
    try:
        cursor = connection.cursor(dictionary=True)
        # Use parameterized query to prevent SQL injection
        query = "SELECT user, password FROM credentials WHERE user = %s"
        cursor.execute(query, (user,))
        result = cursor.fetchall()
        cursor.close()
        return jsonify(result), 200
    except mysql.connector.Error as err:
        return jsonify({"error": f"Something went wrong: {err}"}), 500

# POST: Add new credentials to the table
@app.route("/data/addt", methods=['POST'])
def add_data():
    data = request.get_json()
    email = data.get('email')
    user = data.get('user')
    password = data.get('password')

    if not all([email, user, password]):
        return jsonify({"error": "Fill the data correctly"}), 400

    try:
        cursor = connection.cursor()
        query = "INSERT INTO credentials (email, user, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (email, user, password))
        connection.commit()  # Important: Commit changes to the database
        cursor.close()
        return jsonify({"message": "Successfully inserted the data"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": f"Failed to insert data: {err}"}), 500

# --- Start the Server ---
if __name__ == "__main__":
    app.run(port=5000, debug=True)