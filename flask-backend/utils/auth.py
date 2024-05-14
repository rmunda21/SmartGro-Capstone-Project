from werkzeug.security import check_password_hash, generate_password_hash
from utils.db import connect_to_mongodb
import json

def register_user(username: str, croptype: str, quantity: int, password: str, firstname: str, lastname: str):
    try:
        db = connect_to_mongodb()
        collection = db['UserData']
        user = collection.find_one({"username":username})
        if user:
            return False
        user = collection.insert_one({
            'username': username,
            'croptype': croptype.lower(),
            'quantity': quantity,
            'hash_password': generate_password_hash(password=password),
            'firstname': firstname,
            'lastname': lastname,
        })
        print(user)
        return user
    except Exception as e:
        print('Error Msg', e)
        return None

def authenticate_user(username: str, password: str):
    try:
        db = connect_to_mongodb()
        collection = db['UserData']
        user_data = collection.find_one({'username': username})
        if user_data:
            # print(user_data)
            hash_password = user_data['hash_password']
            if check_password_hash(hash_password, password):
                return user_data
            else:
                return False
        else:
            return None
    except Exception as e:
        print(e)
        return None

def get_user(session_id):
    try:
        db = connect_to_mongodb()
        collection = db['SessionData']
        session_data = collection.find_one({'session_id': session_id})
        if session_data:
            user_data = session_data['data']
            return user_data
        return None
    except Exception as e:
        print(e)
        return None