from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db, collection, db_insert, db_delete

app = Flask(__name__)
CORS(app, origins="http://localhost:5001")

@app.route('/form', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        # Retrieve error if we can't get the message
        return jsonify({'message': 'No data received'}), 400

    name = data.get('name')
    password = data.get('password')
    email = data.get('email')
    app_pass = data.get('app_pass')


    if collection.find_one({"email" : email}) or collection.find_one({"app_pass" : app_pass}):
        return jsonify({'message': 'Email or app password already registered'}), 409
    else:
        db_insert(db, collection, name, password, email, app_pass)

    # Respond back with a success message
    return jsonify({'message': 'Data received successfully'})

# @app.route('/', methods=['GET'])
# def login():
#     pass

# @app.route('/reset', methods=['GET'])
# def login():
#     pass


if __name__ == '__main__':
    app.run(debug=True, port=5000)
