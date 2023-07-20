from flask import Flask, jsonify, request
# from pymongo import MongoClient
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a strong secret key
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with another strong secret key
jwt = JWTManager(app)


# MongoDB Atlas connection configuration
client = MongoClient('mongodb+srv://namrataawasthi077:Himayalan@cluster0.bbbuac5.mongodb.net/mydatabase?retryWrites=true&w=majority')
db = client['mydatabase']
collection = db['movies']
userCollection = db['users']

# Route for retrieving data
@app.route('/movies', methods=['GET'])
# @jwt_required()
def get_data():
    data = list(collection.find())

    # Convert data to a list of dictionaries
    result = []
    for document in data:
        result.append({
            'id': str(document['_id']),
            'title': document['title'],
            'description': document['description'],
            'genre': document['genre'],
            'language': document['language'],
            'duration': document['duration'],
            'releaseDate': document['releaseDate'],
            'poster': document['poster']
            # Add more fields as needed
        })
    return jsonify(result)

# Route for adding data
@app.route('/movies', methods=['POST'])
# @jwt_required()
def add_data():
    data = request.get_json()
    document = data

    result = collection.insert_one(document)

    return jsonify({'id': str(result.inserted_id)})

# Route for adding data
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()

    password = data['password']
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=5))
    data['password'] = hashed_password.decode('utf-8')
    
    document = data

    result = userCollection.insert_one(document)

    return jsonify({'id': str(result.inserted_id)})

# update the user details
@app.route('/users/<string:user_id>', methods=['PUT'])
# @jwt_required()
def update_user(user_id):
    data = request.get_json()
    user = userCollection.find_one({'_id': ObjectId(user_id)})
    
    if not user:
        return jsonify({'message': 'No user found with the provided ID'}), 404
    
    # Create a dictionary of the fields to be updated based on the provided data
    update_data = {}
    for key, value in data.items():
        if key == 'password':
            hashed_password = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt(rounds=5))
            update_data[key] = hashed_password.decode('utf-8')
        else:
            update_data[key] = value

    # Update the user data in the database
    result = userCollection.update_one({'_id': ObjectId(user_id)}, {'$set': update_data})

    if result.modified_count > 0:
        return jsonify({'message': 'User data updated successfully'})
    else:
        return jsonify({'message': 'No changes made to user data'}), 200
    

    # deleting users
@app.route('/users/<string:user_id>', methods=['DELETE'])
# @jwt_required()
def delete_user(user_id):
    # Delete the user with the given ID from the database
    result = userCollection.delete_one({'_id': ObjectId(user_id)})
    
    if result.deleted_count > 0:
        return jsonify({'message': 'User data deleted successfully'})
    else:
        return jsonify({'message': 'No user found with the provided ID'}), 404

@app.route('/users', methods=['GET'])
# @jwt_required()
def get_all_users():
    users = list(userCollection.find({}, {'password': 0}))

    # Exclude the 'password' field from the user data in the response
    # for security reasons. We don't want to expose passwords in the API.

    user_list = []
    for user in users:
        print(user)
        user_list.append({
            'id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'membership_type': user['membership_type'],
            'gender': user['gender']
            # Add more fields as needed
        })

    return jsonify(user_list)


# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['name']
    password = data['password']

    # Retrieve the user document from the database based on the provided username
    user = userCollection.find_one({'name': username})
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        # If the username and password are valid, generate a JWT token
        access_token = create_access_token(identity=str(user['_id']))
        
        return jsonify({'access_token': access_token})
    
    return jsonify({'message': 'Invalid username or password'}), 401



if __name__ == '__main__':
    app.run()