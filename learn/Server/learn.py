import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

# Load environment variables from .env file
load_dotenv()

# Create a Flask app and enable CORS
app = Flask(__name__)
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
    print(f"Error connecting to database: {err}")
    exit(1)

# --- API Endpoints ---

# GET: Fetch all data from the 'learn' table
@app.route("/info", methods=['GET'])
def get_info():
    try:
        # dictionary=True makes the cursor return results as dictionaries (like JSON objects)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM learn")
        result = cursor.fetchall()
        cursor.close()
        return jsonify(result), 200
    except mysql.connector.Error as err:
        return jsonify({"error": f"Failed to get the data: {err}"}), 500

# POST: Add a new user to the 'learn' table
@app.route("/adduser", methods=['POST'])
def add_user():
    # Get the JSON data from the request body
    data = request.get_json()
    user_id = data.get('id')
    user_name = data.get('name')

    # Check if both id and name are provided
    if not user_id or not user_name:
        return jsonify({"error": "Fill the data correctly"}), 400

    try:
        cursor = connection.cursor()
        query = "INSERT INTO learn (id, name) VALUES (%s, %s)"
        # Using a tuple (user_id, user_name) for parameterized query prevents SQL injection
        cursor.execute(query, (user_id, user_name))
        
        # You must commit the transaction to save the changes
        connection.commit()
        
        # Check if any row was actually inserted
        if cursor.rowcount == 0:
            return jsonify({"error": "Failed to insert the data"}), 400

        cursor.close()
        return jsonify({"message": "Successfully inserted"}), 200
    except mysql.connector.Error as err:
        # Catches errors like a duplicate primary key
        return jsonify({"error": f"Failed to insert the data: {err}"}), 500

# --- Start the Server ---
if __name__ == "__main__":
    app.run(port=5000, debug=True)