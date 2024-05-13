import datetime
from utils.db import connect_to_mongodb
import secrets

def generate_session_id():
    session_id = secrets.token_hex(16)
    return session_id

class CustomSession():

    @staticmethod
    def create_session(data):
        try:
            session_id = generate_session_id()
            expiration=datetime.datetime.now() + datetime.timedelta(hours=24)
            db = connect_to_mongodb()
            collection = db['SessionData']
            collection.insert_one({
            'session_id': session_id,
            'expiration': expiration,
            'data': data,
            })
            return session_id
        except Exception as e:
            print(e)
            return None

    @staticmethod
    def get_session(session_id):
        db = connect_to_mongodb()
        collection = db['SessionData']
        session_data = collection.find_one({"session_id":session_id})
        return session_data if session_data else None