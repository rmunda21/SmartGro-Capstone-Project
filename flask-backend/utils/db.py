from pymongo import MongoClient
from pymongo.server_api import ServerApi

# MongoDB settings
uri = "mongodb+srv://andre:r8ViFc2453NZPFBL@farmdata.gv5ejiy.mongodb.net/?retryWrites=true&w=majority&appName=FarmData"
mongo_db = "GreenHouse"

# Function to connect to MongoDB
def connect_to_mongodb():
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        client.admin.command('ping')
        print("Ping")
        db = client[mongo_db]
        

        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return db

    
    
    except Exception as e:
        print("Line: ", e.__traceback__.tb_lineno)
        print("Connect Error", e)
        return