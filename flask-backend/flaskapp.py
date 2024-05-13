from flask import Flask, request, make_response
from flask_cors import CORS
from dotenv import load_dotenv
from flask import render_template, request, jsonify
from flask import Flask, make_response, request
from utils.db import connect_to_mongodb
from utils.auth import register_user, authenticate_user

# from config import Config
from collections import defaultdict

colorarr = ['#0592D0','#Cd7f32', '#E97451', '#Bdb76b', '#954535', '#C2b280', '#808000','#C2b280', '#E4d008', '#9acd32', '#Eedc82', '#E4d96f',
           '#32cd32','#39ff14','#00ff7f', '#008080', '#36454f', '#F88379', '#Ff4500', '#Ffb347', '#A94064', '#E75480', '#Ffb6c1', '#E5e4e2',
           '#Faf0e6', '#8c92ac', '#Dbd7d2','#A7a6ba', '#B38b6d']


load_dotenv()  # LOAD .env FILES IN CURRENT FOLDER
app = Flask(__name__)
app.config['SECRET_KEY'] = '6#uon)rmr-^+#7!gyon^#^hc^19vhs!6$)$s092mn+jfa_6*gd'
cors = CORS(app, supports_credentials=True, allow_headers=True)


@app.route('/api/register/', methods=['POST'])
def register():
    try:
        form_data = request.form
        username = form_data['username']
        firstname = form_data['firstname']
        lastname = form_data['lastname']
        password = form_data['password']
        user = register_user(username=username, password=password, firstname=firstname, lastname=lastname)
        if user:
            print("User added")
            return make_response({'message': 'success'}, 200)
        elif user == False:
            print("User already exists")
            return make_response({'message': 'User already exists'}, 400)
        else:
            print("Error")
        return make_response({'message': 'error'}, 400)
    except Exception as e:
        print("Test: ", e)
        return make_response({'message': "Error"}, 400)
    

@app.route('/api/login/', methods=['POST'])
def login():
    form_data = request.form
    username = form_data['username']
    password = form_data['password']
    print()
    user = authenticate_user(username=username, password=password)
    print(user)
    if user:
        return make_response({'message': 'success'}, 200)
    elif user == False:
        return make_response({'message': 'Invalid username/password entered'}, 400)
    return make_response({'message': 'error'}, 400)


    
@app.route('/api/json', methods=["GET","POST"]) 
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
uri = "mongodb+srv://andre:r8ViFc2453NZPFBL@farmdata.gv5ejiy.mongodb.net/?retryWrites=true&w=majority&appName=FarmData"
mongo_host = "localhost"
mongo_port = 27017
mongo_db = "GreenHouse"
mongo_collection = "FarmData"
crop_data_collection = "CropData"
user_data_collection = "UserData"

# Connect to MongoDB
db = connect_to_mongodb()

if __name__ == '__main__':
    app.run(debug=True,port=5000)








