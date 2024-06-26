from flask import Flask
import os
from dotenv import load_dotenv
from flask import Flask
from utils.db import connect_to_mongodb



# from config import Config
import os.path
import paho.mqtt.client as mqtt
import json

colorarr = ['#0592D0','#Cd7f32', '#E97451', '#Bdb76b', '#954535', '#C2b280', '#808000','#C2b280', '#E4d008', '#9acd32', '#Eedc82', '#E4d96f',
           '#32cd32','#39ff14','#00ff7f', '#008080', '#36454f', '#F88379', '#Ff4500', '#Ffb347', '#A94064', '#E75480', '#Ffb6c1', '#E5e4e2',
           '#Faf0e6', '#8c92ac', '#Dbd7d2','#A7a6ba', '#B38b6d']

load_dotenv()  # LOAD .env FILES IN CURRENT FOLDER
app = Flask(__name__)
app.config['SECRET_KEY'] = '6#uon)rmr-^+#7!gyon^#^hc^19vhs!6$)$s092mn+jfa_6*gd'

# MongoDB settings
uri = "mongodb+srv://andre:r8ViFc2453NZPFBL@farmdata.gv5ejiy.mongodb.net/?retryWrites=true&w=majority&appName=FarmData"
mongo_host = "localhost"
mongo_port = 27017
mongo_db = "GreenHouse"
mongo_collection = "FarmData"
crop_data_collection = "CropData"
user_data_collection = "UserData"

# Connect to MongoDB
db = connect_to_mongodb()

# MQTT settings



global mqtt_data
# MQTT on_connect callback
def on_connect(client, userdata, flags, rc):
  print("Connected to MQTT broker")
  client.subscribe("G001")

# MQTT on_message callback
def on_message(client, userdata, msg):
  try:
    # print(msg.payload.decode())
    # Parse JSON data
    data = json.loads(msg.payload.decode())
    # print(data)
    
    db = connect_to_mongodb()
    collection = db[mongo_collection]
    crop = db[crop_data_collection]
    user_data = db[user_data_collection]
    
    # Insert data into MongoDB
    collection.insert_one(data)
    
    # user = user_data.find_one({}, { "G001.username": 1 })
    
    user = user_data.find_one({"username": "G001"})
    # print("Line 1 " + user)
    # user = user["G001"]['username']
    # print(user)
    
    
    # Read from MongoDB
    cropType = user["croptype"]
    # print(cropType)
    crop_data = crop.find_one({},{cropType})
    # print(crop_data)
    crop_data.pop('_id')
    # print(crop_data)    
    temperature = crop_data[cropType]['temperature']
    # print(temperature)

    rain = crop_data[cropType]['rainfall']
    potassium = crop_data[cropType]['K']
    nitrogen = crop_data[cropType]['N']
    phosphorus = crop_data[cropType]['P']
    
    # rain = crop.find_one({}, { f"{cropType}.rainfall": 1 })
    # rain = rain[cropType]['rainfall']
    # potassium = crop.find_one({}, { f"{cropType}.K": 1 })
    # potassium = potassium[cropType]['K']
    # nitrogen = crop.find_one({}, { f"{cropType}.N": 1 })
    # nitrogen = nitrogen[cropType]['N']
    # phosphorus = crop.find_one({}, { f"{cropType}.P": 1 })
    # phosphorus = phosphorus[cropType]['P']
    
    # print(potassium)
    
    mqtt_data = bytearray(json.dumps({
        "Type" : "CropData",
        "CropName": cropType,
        "temperature": temperature,
        "rain": rain,
        "potassium": potassium,
        "nitrogen": nitrogen,
        "phosphorus": phosphorus
    }), 'utf-8')
    # print(round(temperature,2),int(round(rain,2)),int(round(potassium,2)))
    # client.publish("G_Pro_1", round(temperature,2))
    client.publish("G_Pro_1",mqtt_data)
    
    
    print("Data inserted into MongoDB")
    
  except Exception as e:
    print("error",e.__traceback__.tb_lineno,str(e))

# Create MQTT client
client = mqtt.Client()


# Set MQTT callbacks
client.on_connect = on_connect
client.on_message = on_message

# Set MQTT username and password
client.username_pw_set("8z5wLEG2qXPH1MtDJzYNTkzo7eFQELAwB9hSRO4FeajhoWMdcFu9gWgS3gLYk52w", "")

# Connect to MQTT broker
client.connect("mqtt.flespi.io", 1883, 8883)
# client.publish("G_Pro_1", "Hello from Flask")
# client.publish("G_Pro_1",mqtt_data)    


# # Start MQTT loop
client.loop_forever()

if __name__ == '__main__':
    app.run(debug=True, port=8000)

#################################################################################################################################################
#                                                    CLASSES CONTAINING ALL THE APP FUNCTIONS                                                                                                    #
#################################################################################################################################################


class Config:
    FLASK_RUN_PORT = os.getenv("FLASK_RUN_PORT")
    FLASK_DEBUG = os.getenv("FLASK_DEBUG")
    SECRET_KEY      = os.environ.get('SECRET_KEY', 'Som3$ec5etK*y')
    FLASK_RUN_HOST = os.getenv("FLASK_RUN_HOST")
    DB_SERVER = os.getenv("DB_SERVER")
    DB_PORT = os.getenv("DB_PORT")
    SYSFILES = os.environ.get("SYSFILES") 
    DB_USERNAME = os.getenv("DB_USERNAME")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_PORT = os.environ.get('DB_PORT')
    
class Mqtt:
    def __init__(self, subtopic, server, port):
        from json import loads, dumps
        from time import time, sleep 
        from os import system, getcwd, path, popen, listdir
        from os.path import join
        import paho.mqtt.client as mqtt
        from collections import defaultdict
        from random import randint
     
        self.Config                         = Config
        self.system             		    = system
        self.getcwd             		    = getcwd
        self.path 			                = path
        self.time 			                = time
        self.sleep 			                = sleep
        self.popen 			                = popen
        self.listdir 			            = listdir
        self.loads              		    = loads
        self.dumps 		                    = dumps
        self.subtopic                   	= subtopic
        self.server                         = server  
        self.port                           = port
        self.client                     	= mqtt.Client(client_id="updater{ID}".format(ID = str(randint(0,777))))
        # self.client                     	= mqtt.Client(client_id="Flask-Backend")

        self.client.on_connect          	= self.on_connect
        self.client.on_message          	= self.on_message

        # Create and instance of the DB class for use in this class
        # This gives this MQTT class access to all the functions in the DB class
        self.db                             = DB(self.Config) 
        self.Print("MQTT CALLED INIT")
        # Init MQTT Client
        self.client.connect(self.server, self.port, 60)
        self.client.loop_start()

def Print(self,message):
        message = f" CCS: {message}"
        print(message) 
        
# The callback for when the client receives a CONNACK response from the server.
def on_connect(self, client, userdata, flags, rc):
        self.Print("Connected with result code "+str(rc))
        # Subscribing in on_connect() means that if we lose the connection and
        # reconnect then subscriptions will be renewed.
        self.client.subscribe(self.subtopic)   # <============== subscribe topic

# The callback for when a PUBLISH message is received from the server.
def on_message(self,client, userdata, msg):
        # print any message received
        self.Print(msg.topic+" "+str(msg.payload))

        # Convert mssg to python dictionary
        data = self.loads(msg.payload.decode("utf-8"))

        # Insert message into database
        self.db.insertFromCCS(data)
        # self.db.insertCropData(crop_summary_json)
            
def Publish(self,topic,payload):
        self.client.publish(topic,payload)
        
        # Read from CSV file
# with open('Crop_recommendation.csv', 'r') as file:
#     reader = csv.reader(file)
#     for row in reader:
#         # Process each row of data
#         json_data = {
#             'data': row
#         }
#         # client.publish("G001", json.dumps(json_data))


class DB:
    def __init__(self, Config):
        from time import sleep, time, localtime, ctime, mktime 
        from math import floor
        from os import getcwd
        from os.path import join, exists
        from json import loads, dumps
        from datetime import timedelta, datetime
        from pymongo import MongoClient , errors
        from urllib import parse
        from urllib.request import  urlopen 
        from random import randint  
        from secrets import token_hex


        self.Config                         = Config
        self.randint                    	= randint  
        self.token_hex                      = token_hex
        self.getcwd                         = getcwd
        self.join                           = join 
        self.sleep                      	= sleep
        self.time                       	= time 
        self.localtime                  	= localtime
        self.ctime                      	= ctime
        self.mktime                     	= mktime
        self.floor                      	= floor   
        self.loads                      	= loads
        self.dumps                      	= dumps
        self.request                    	= urlopen 
        self.exists                         = exists
        self.timedelta                  	= timedelta
        self.datetime                       = datetime
        self.server			                = Config.DB_SERVER
        self.port			                = Config.DB_PORT
        self.username                   	= parse.quote_plus(Config.DB_USERNAME)
        self.password                   	= parse.quote_plus(Config.DB_PASSWORD)
        self.remoteMongo                	= MongoClient
        self.PyMongoError               	= errors.PyMongoError
        self.BulkWriteError             	= errors.BulkWriteError 
        self.DESCENDING                 	= 1
        self.ASCENDING                  	= -1  

    def testConnection(self):
        # TEST CONNECTION TO MONGODB DATABASE
        self.Print("TESTING CONNECTION TO REMOTE DATABASE ")
        result 	= False
        try:             
            #The ismaster command is cheap and does not require auth.
            remotedb 	= self.remoteMongo('mongodb://%s:%s@%s:%s' % (self.username, self.password,self.server,self.port) ) 
            result      = remotedb.server_info()
            

        except  self.PyMongoError as e:
            message 	= "UNABLE TO CONNECT TO REMOTE DATABASE ,ERROR CODE : {error} \n EXITING \n".format( error = str(e))
        else:
            self.Print("CONNECTED TO REMOTE SERVER \n")
            # self.Print(str(result))
            result 		= True
        finally:
            pass

        return result

    def Print(self, message):
        message = f" AWS: {message}"
        print(message)
        # logging.debug(message)

    def insertFromCCS(self, data):
        # INSERT DATA PUBLISHED FROM CCS HARDWARE INTO THE DATA COLLECTION OF THE DATABASE      
        try:
            remotedb = self.remoteMongo('mongodb://%s:%s@%s:%s' % (self.username, self.password,self.server,self.port))
            result = remotedb["GreenHouse"]["FarmData"].insert_one(data)
            print("Data inserted into MongoDB")
        except Exception as e:
            error = str(e)
            if not "duplicate" in error:
                print(error)
            return False
        else:                  
            return True
        
        
    def insertUser(self, data):
            
        try:
            remotedb = self.remoteMongo('mongodb://%s:%s@%s:%s' % (self.username, self.password,self.server,self.port))
            result = remotedb["GreenHouse"]["UserData"].insert_one(data)
            print("Data inserted into MongoDB")
        except Exception as e:
            error = str(e)
            if not "duplicate" in error:
                print(error)
            return False
        else:                  
            return True
        
        
    # def insertCropData(self, crop_summary_json):
        
    #     try:
    #         remotedb = self.remoteMongo('mongodb://%s:%s@%s:%s' % (self.username, self.password,self.server,self.port))
    #         result = remotedb["GreenHouse"]["CropData"].insert_one(crop_summary_json)
    #         print("CropData inserted into MongoDB")
    #     except Exception as e:
    #         error = str(e)
    #         if not "duplicate" in error:
    #             print(error)
    #         return False
    #     else:                  
    #         return True







