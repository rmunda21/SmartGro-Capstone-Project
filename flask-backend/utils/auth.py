from werkzeug.security import check_password_hash, generate_password_hash
from utils.db import connect_to_mongodb
from flask import jsonify

def register_user(username: str, password: str, firstname: str, lastname: str):
    try:
        db = connect_to_mongodb()
        collection = db['UserData']
        # user = collection.find({username})
        
        rows = collection.find({'username': username})
        rows = list(row)
        for row in rows:
            if row:
                return False

        user = collection.insert_one({
            'username': username,
            'hash_password': generate_password_hash(password=password),
            'firstname': firstname,
            'lastname': lastname,
        })
        return user
    except Exception as e:
        print('Error Msg', e.__traceback__.tb_lineno)
        return None

def authenticate_user(username: str, password: str):
    try:
        db = connect_to_mongodb()
        collection = db['UserData']
        user_data = collection.find_one({'username': username})
        if user_data:
            return user_data
        else:
            return None
    except Exception as e:
        print(e)
        return None