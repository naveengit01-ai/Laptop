from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database connection
db = mysql.connector.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
    database=os.getenv("DATABASE")
)

cursor = db.cursor(dictionary=True)
print("Database connected")

# ----------------------------------------
# GET all accounts
# ----------------------------------------
@app.route("/data", methods=["GET"])
def get_all_data():
    try:
        cursor.execute("SELECT * FROM Account")
        result = cursor.fetchall()
        return jsonify(result), 200
    except:
        return jsonify("Failed to get data"), 404

# ----------------------------------------
# Create new account
# ----------------------------------------
@app.route("/add/data", methods=["POST"])
def add_account():
    data = request.json
    name = data.get("name")
    location = data.get("location")
    account_type = data.get("account_type")
    balance = data.get("balance")

    if not all([name, location, account_type, balance]):
        return jsonify("Fill the data correctly"), 400

    try:
        query = """
        INSERT INTO Account (Name, Location, Account_Type, Balance)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (name, location, account_type, balance))
        db.commit()
        return jsonify("Successfully inserted"), 200
    except:
        return jsonify("Failed to insert data"), 404

# ----------------------------------------
# Get account by number
# ----------------------------------------
@app.route("/data/<int:number>", methods=["GET"])
def get_account(number):
    cursor.execute(
        "SELECT * FROM Account WHERE Account_number=%s", (number,)
    )
    result = cursor.fetchall()

    if not result:
        return jsonify("User not found"), 404

    return jsonify(result), 200

# ----------------------------------------
# Delete account
# ----------------------------------------
@app.route("/delete/<int:number>", methods=["DELETE"])
def delete_account(number):
    cursor.execute(
        "DELETE FROM Account WHERE Account_number=%s", (number,)
    )
    db.commit()

    if cursor.rowcount == 0:
        return jsonify("No account found"), 404

    return jsonify("Successfully deleted the account"), 200

# ----------------------------------------
# Withdraw money
# ----------------------------------------
@app.route("/withdraw/<int:number>", methods=["PUT"])
def withdraw(number):
    money = request.json.get("balance")

    if not money:
        return jsonify("Fill the data correctly"), 400

    cursor.execute(
        "SELECT Balance FROM Account WHERE Account_number=%s", (number,)
    )
    result = cursor.fetchone()

    if not result:
        return jsonify("Account not found"), 404

    if result["Balance"] < money:
        return jsonify("Insufficient balance"), 400

    cursor.execute(
        "UPDATE Account SET Balance=Balance-%s WHERE Account_number=%s",
        (money, number)
    )
    db.commit()

    return jsonify("Money withdrawn successfully"), 200

# ----------------------------------------
# Deposit money
# ----------------------------------------
@app.route("/deposit/<int:number>", methods=["PUT"])
def deposit(number):
    money = request.json.get("balance")

    if not money:
        return jsonify("Please enter amount"), 400

    cursor.execute(
        "UPDATE Account SET Balance=Balance+%s WHERE Account_number=%s",
        (money, number)
    )
    db.commit()

    if cursor.rowcount == 0:
        return jsonify("Account not exist"), 404

    return jsonify("Successfully deposited"), 200

# ----------------------------------------
# Transfer money
# ----------------------------------------
@app.route("/transfer/<int:ua>/<int:sa>", methods=["PUT"])
def transfer(ua, sa):
    money = request.json.get("money")

    if not money or money <= 0:
        return jsonify("Enter valid amount"), 400

    cursor.execute(
        "SELECT Balance FROM Account WHERE Account_number=%s", (ua,)
    )
    sender = cursor.fetchone()

    if not sender:
        return jsonify("Sender not found"), 404

    if sender["Balance"] < money:
        return jsonify("Insufficient balance"), 403

    try:
        cursor.execute(
            "UPDATE Account SET Balance=Balance-%s WHERE Account_number=%s",
            (money, ua)
        )
        cursor.execute(
            "UPDATE Account SET Balance=Balance+%s WHERE Account_number=%s",
            (money, sa)
        )
        db.commit()
        return jsonify("Successfully transferred money"), 200
    except:
        db.rollback()
        return jsonify("Transfer failed"), 400

# ----------------------------------------
# Run server
# ----------------------------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
