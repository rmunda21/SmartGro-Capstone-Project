from flask import Flask, request, make_response
import os
from dotenv import load_dotenv
from flask import render_template, request, redirect, url_for, flash, session, send_from_directory, abort , jsonify
from flask import Flask, make_response, request
from time import time, ctime, sleep
from math import floor
from datetime import datetime, timedelta


# from config import Config
import os.path
from collections import defaultdict
import paho.mqtt.client as mqtt
import json
from pymongo import MongoClient

load_dotenv()  # LOAD .env FILES IN CURRENT FOLDER
app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    print(request.form['username'])
    return make_response({'message': 'success'}, 200)



    
@app.route('/json', methods=["GET","POST"]) 
def json_object(): 
    """Returns Json object""" 
    if request.method == "GET": 
        # Process GET requests 
        message = {"status":"GET request received"} 
        return jsonify(message) 
    if request.method == "POST": 
        # Process POST requests 
        message = {"status":"POST request received"} 
        return jsonify(message) 
    return render_template('404.html'), 404



# MongoDB settings
mongo_host = "localhost"
mongo_port = 27017
mongo_db = "GreenHouse"
mongo_collection = "FarmData"

# MQTT on_connect callback
def on_connect(client, userdata, flags, rc):
  print("Connected to MQTT broker")
  client.subscribe("G001")

# MQTT on_message callback
def on_message(client, userdata, msg):
  try:
    print(msg.payload.decode())
    # Parse JSON data
    data = json.loads(msg.payload.decode())
    print(data)
    
    # Connect to MongoDB
    client = MongoClient(mongo_host, mongo_port)
    db = client[mongo_db]
    collection = db[mongo_collection]
    
    # Insert data into MongoDB
    collection.insert_one(data)
    
    print("Data inserted into MongoDB")
    
  except Exception as e:
    print("Error:", str(e))

# Create MQTT client
client = mqtt.Client()

# Set MQTT callbacks
client.on_connect = on_connect
client.on_message = on_message

# Connect to MQTT broker
client.connect("broker.hivemq.com", 1883, 8883)

# Start MQTT loop
client.loop_forever()

if __name__ == '__main__':
    app.run(debug=True)

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
            
def Publish(self,topic,payload):
        self.client.publish(topic,payload)

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





