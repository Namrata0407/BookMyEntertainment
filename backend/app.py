from flask import Flask, jsonify, request
# from pymongo import MongoClient
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os
from pymongo import ASCENDING, DESCENDING

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a strong secret key
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with another strong secret key
jwt = JWTManager(app)

# Explicitly load the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

mongo_uri = os.environ.get('API_URL')

# MongoDB Atlas connection configuration
client = MongoClient(mongo_uri)  # Use the correct variable here
db = client['mydatabase']
collection = db['movies']
userCollection = db['users']
showsCollection = db['shows']
ordersCollection = db['orders']

# Route for adding booking
@app.route('/bookshow', methods=['POST'])
@jwt_required()
def add_bookshow():
    data = request.get_json()
    user_id = get_jwt_identity()
    data['user_id'] = user_id
    # print(data)
    document = data
    result = ordersCollection.insert_one(document)

    return jsonify({'id': str(result.inserted_id)})

# Route for retrieving a specific show by id
@app.route('/bookshow', methods=['GET'])
@jwt_required()
def get_bookshow():
    user_id = get_jwt_identity()
    orders = ordersCollection.find({"user_id":user_id})
    # Convert data to a dictionary

    shows_list = []
    print(user_id)
    for order in orders:
        shows_list.append({
            'id': str(order['_id']),
            'movie_id': str(order['movie_id']),
            'show_id': str(order['show_id']),
            'venue': order.get('venue', None),
            'title': order.get('title', None),
            'date': order.get('date', None),
            'start_time': order.get('start_time', None),
            'end_time': order.get('end_time', None),
            'category': order.get('category', None),
            'poster': order.get('poster', None),
            'user_id': order.get('user_id', None)
            # Add more fields as needed
        })

    return jsonify(shows_list)


@app.route('/bookshow/<string:show_id>', methods=['DELETE'])
# @jwt_required()
def delete_bookshow(show_id):
    # Delete the show with the given ID from the database
    result = ordersCollection.delete_one({'_id': ObjectId(show_id)})
    
    if result.deleted_count > 0:
        return jsonify({'message': 'bookshow data deleted successfully'})
    else:
        return jsonify({'message': 'No bookshow found with the provided ID'}), 404


# Route for adding show
@app.route('/shows', methods=['POST'])
# @jwt_required()
def add_show():
    data = request.get_json()
    document = data

    result = showsCollection.insert_one(document)

    return jsonify({'id': str(result.inserted_id)})

# Assuming you have imported the required modules and initialized the app and database connection as shown before
# movie_id, category, sort_by_price, and sort_by_rating 
@app.route('/shows', methods=['GET'])
# @jwt_required()
def get_all_shows():
    # Get the query parameters for search and sorting
    movie_id = request.args.get('movie_id', None)
    category = request.args.get('category', None)
    sort_by_price = request.args.get('sort_by_price', None)
    sort_by_rating = request.args.get('sort_by_rating', None)

    # Create a filter dictionary based on provided filter parameters
    filter_dict = {}
    if movie_id:
        filter_dict['movie_id'] = movie_id
    if category:
        filter_dict['category'] = category

    # Query the database to retrieve shows based on the filter
    shows = showsCollection.find(filter_dict)

    # Sort shows by ticket price if 'sort_by_price' parameter is provided
    if sort_by_price:
        sort_order = ASCENDING if sort_by_price.lower() == 'asc' else DESCENDING
        shows = shows.sort('ticket_price', sort_order)

    # Sort shows by rating if 'sort_by_rating' parameter is provided
    if sort_by_rating:
        sort_order = ASCENDING if sort_by_rating.lower() == 'asc' else DESCENDING
        shows = shows.sort('rating', sort_order)

    # Convert data to a list of dictionaries
    shows_list = []
    for show in shows:
        shows_list.append({
            "id": str(show['_id']),
            'movie_id': str(show['movie_id']),
            'venue': show.get('venue', None),
            'date': show.get('date', None),
            'start_time': show.get('start_time', None),
            'end_time': show.get('end_time', None),
            'category': show.get('category', None),
            'available_seats': show.get('available_seats', None),
            'ticket_price': show.get('ticket_price', None),
            'rating': show.get('rating', None)
            # Add more fields as needed
        })

    return jsonify(shows_list)

# Route for retrieving a specific show by id
@app.route('/shows/<string:show_id>', methods=['GET'])
# @jwt_required()
def get_show_by_id(show_id):
    show = showsCollection.find_one({'_id': ObjectId(show_id)})

    if not show:
        return jsonify({'message': 'No show found with the provided ID'}), 404

    # Convert data to a dictionary
    show_data = {
        "id": str(show['_id']),
        'movie_id': str(show['movie_id']),
        'venue': show.get('venue', None),
        'date': show.get('date', None),
        'start_time': show.get('start_time', None),
        'end_time': show.get('end_time', None),
        'category': show.get('category', None),
        'available_seats': show.get('available_seats', None),
        'ticket_price': show.get('ticket_price', None),
        'rating': show.get('rating', None)
        # Add more fields as needed
    }

    return jsonify(show_data)



# Route for updating a specific show by id
@app.route('/shows/<string:show_id>', methods=['PUT'])
# @jwt_required()
def update_show(show_id):
    data = request.get_json()
    show = showsCollection.find_one({'_id': ObjectId(show_id)})

    if not show:
        return jsonify({'message': 'No show found with the provided ID'}), 404

    # Create a dictionary of the fields to be updated based on the provided data
    update_data = {}
    if 'venue' in data:
        update_data['venue'] = data['venue']
    if 'date' in data:
        update_data['date'] = data['date']
    if 'start_time' in data:
        update_data['start_time'] = data['start_time']
    if 'end_time' in data:
        update_data['end_time'] = data['end_time']
    if 'category' in data:
        update_data['category'] = data['category']
    if 'available_seats' in data:
        update_data['available_seats'] = data['available_seats']
    if 'ticket_price' in data:
        update_data['ticket_price'] = data['ticket_price']
    if 'rating' in data:
        update_data['rating'] = data['rating']

    # Update the show data in the database
    result = showsCollection.update_one({'_id': ObjectId(show_id)}, {'$set': update_data})

    if result.modified_count > 0:
        return jsonify({'message': 'Show data updated successfully'})
    else:
        return jsonify({'message': 'No changes made to show data'}), 200

# Route for deleting a specific show by id
@app.route('/shows/<string:show_id>', methods=['DELETE'])
# @jwt_required()
def delete_show(show_id):
    # Delete the show with the given ID from the database
    result = showsCollection.delete_one({'_id': ObjectId(show_id)})
    
    if result.deleted_count > 0:
        return jsonify({'message': 'Show data deleted successfully'})
    else:
        return jsonify({'message': 'No show found with the provided ID'}), 404


# Route for retrieving data with pagination and filtering
@app.route('/movies', methods=['GET'])
# @jwt_required()
def get_data():
    # Get query parameters for pagination
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 100))  # Default page size is 10

    # Calculate the number of documents to skip based on the page number and page size
    skip = (page - 1) * page_size

    # Get query parameters for filtering
    filter_title = request.args.get('title', None)
    filter_genre = request.args.get('genre', None)
    filter_language = request.args.get('language', None)
    filter_duration = request.args.get('duration', None)
    filter_release_date = request.args.get('release_date', None)

    # Get the search query
    search_query = request.args.get('search', None)

    # Create a filter dictionary based on provided filter parameters
    filter_dict = {}
    if filter_title:
        filter_dict['title'] = filter_title
    if filter_genre:
        filter_dict['genre'] = filter_genre
    if filter_language:
        filter_dict['language'] = filter_language
    if filter_duration:
        filter_dict['duration'] = int(filter_duration)
    if filter_release_date:
        # Assuming the release_date is in the format 'YYYY-MM-DD'
        filter_dict['releaseDate'] = filter_release_date

    # Add the search query to the filter dictionary
    if search_query:
        filter_dict['$or'] = [
            {'title': {'$regex': search_query, '$options': 'i'}},
            {'description': {'$regex': search_query, '$options': 'i'}},
            {'genre': {'$regex': search_query, '$options': 'i'}},
            {'language': {'$regex': search_query, '$options': 'i'}},
            # Add more fields as needed for search
        ]

    # Query the database to retrieve paginated, filtered, and searched data
    data = collection.find(filter_dict).skip(skip).limit(page_size)


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


# Route for retrieving a single movie by ID
@app.route('/movies/<string:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):
    # Find the movie by its ID in the database
    movie = collection.find_one({'_id': ObjectId(movie_id)})

    if movie:
        # Convert the movie data to a dictionary
        result = {
            'id': str(movie['_id']),
            'title': movie['title'],
            'description': movie['description'],
            'genre': movie['genre'],
            'language': movie['language'],
            'duration': movie['duration'],
            'releaseDate': movie['releaseDate'],
            'poster': movie['poster']
            # Add more fields as needed
        }
        return jsonify(result)
    else:
        return jsonify({'message': 'Movie not found'}), 404


# Route for adding data
@app.route('/movies', methods=['POST'])
# @jwt_required()
def add_data():
    data = request.get_json()
    document = data

    result = collection.insert_one(document)

    return jsonify({'id': str(result.inserted_id)})

@app.route('/movies/<string:user_id>', methods=['PUT'])
# @jwt_required()
def update_movie(user_id):
    data = request.get_json()
    movie = collection.find_one({'_id': ObjectId(user_id)})
    
    if not movie:
        return jsonify({'message': 'No movie found with the provided ID'}), 404
    
    # Create a dictionary of the fields to be updated based on the provided data
    update_data = {}
    for key, value in data.items():
        update_data[key] = value

    # Update the user data in the database
    result = collection.update_one({'_id': ObjectId(user_id)}, {'$set': update_data})

    if result.modified_count > 0:
        return jsonify({'message': 'movie data updated successfully'})
    else:
        return jsonify({'message': 'No changes made to user data'}), 200
    
# deleting movies
@app.route('/movies/<string:movie_id>', methods=['DELETE'])
# @jwt_required()
def delete_movie(movie_id):
    # Delete the user with the given ID from the database
    result = collection.delete_one({'_id': ObjectId(movie_id)})
    
    if result.deleted_count > 0:
        return jsonify({'message': 'Movie data deleted successfully'})
    else:
        return jsonify({'message': 'No user found with the provided ID'}), 404    

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

# @app.route('/users', methods=['GET'])
@app.route('/users', methods=['GET'])
# @jwt_required()
def get_all_users():
    # Get query parameters for pagination
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 100))  # Default page size is 10

    # Calculate the number of documents to skip based on the page number and page size
    skip = (page - 1) * page_size

    # Get query parameters for filtering
    filter_name = request.args.get('name', None)
    filter_email = request.args.get('email', None)
    filter_membership_type = request.args.get('membership_type', None)
    filter_gender = request.args.get('gender', None)

    # Create a filter dictionary based on provided filter parameters
    filter_dict = {}
    if filter_name:
        filter_dict['name'] = filter_name
    if filter_email:
        filter_dict['email'] = filter_email
    if filter_membership_type:
        filter_dict['membership_type'] = filter_membership_type
    if filter_gender:
        filter_dict['gender'] = filter_gender

    # Query the database to retrieve paginated and filtered data
    users = list(userCollection.find(filter_dict, {'password': 0}).skip(skip).limit(page_size))

    # Convert data to a list of dictionaries
    user_list = []
    for user in users:
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
    username = data['email']
    password = data['password']

    # Retrieve the user document from the database based on the provided username
    user = userCollection.find_one({'email': username})
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        # If the username and password are valid, generate a JWT token
        access_token = create_access_token(identity=str(user['_id']))
        
        return jsonify({'access_token': access_token})
    
    return jsonify({'message': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run()