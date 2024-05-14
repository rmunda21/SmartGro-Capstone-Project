from flask import Flask, request, make_response, session
from flask_cors import CORS
from dotenv import load_dotenv
from flask import render_template, request, jsonify
from flask import Flask, make_response, request
from utils.db import connect_to_mongodb
from utils.auth import register_user, authenticate_user, get_user_data
from utils.session import CustomSession
from utils.crop import get_crop_data, update_user_crop_type
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
        croptype = form_data['croptype']
        quantity = form_data['quantity']
        lastname = form_data['lastname']
        password = form_data['password']
        user = register_user(username=username, croptype=croptype, quantity=quantity, password=password, firstname=firstname, lastname=lastname)
        if user:
            print("User added")
            session_data = {'username': user['username'], 'croptype': user['croptype'], 'quantity': user['quantity'], 'firstname': user['firstname'], 'lastname': user['lastname']}
            session_id = CustomSession.create_session(session_data)
            if not session_id:
                raise Exception
            session['session_id'] = session_id
            return make_response({'message': 'success'}, 200)
        elif user == False:
            print("User already exists")
            return make_response({'message': 'User already exists'}, 400)
        else:
            print("Error")
        return make_response({'message': 'error'}, 400)
    except Exception as e:
        return make_response({'message': "Error"}, 400)
    

@app.route('/api/login/', methods=['POST'])
def login():
    try:
        form_data = request.form
        username = form_data['username']
        password = form_data['password']
        user = authenticate_user(username=username, password=password)
        if user:
            session_data = {'username': user['username'], 'croptype': user['croptype'], 'quantity': user['quantity'], 'firstname': user['firstname'], 'lastname': user['lastname']}
            session_id = CustomSession.create_session(session_data)
            if not session_id:
                raise Exception
            session['session_id'] = session_id
            return make_response({'message': 'success'}, 200)
        elif user == False:
            return make_response({'message': 'Invalid username/password entered'}, 400)
    except Exception as e:
        return make_response({'message': 'error'}, 400)

@app.route('/api/logout/', methods=['POST'])
def logout():
    try:
        session.pop('session_id', None)
        session.pop('session', None)
        return make_response({'message': 'success'}, 200)
    except Exception as e:
        return make_response({'message': 'error'}, 400)
        
@app.route('/api/verify/', methods=['POST'])
def verify_session():
    try:
        if 'session_id' in session:
            session_id = session['session_id']
            session_data = CustomSession.get_session(session_id)
            # If session data is present then the user is authenticated
            if session_data:
                return make_response({'message': 'success'}, 200)
            return make_response({'message': 'invalid'}, 400)
    except Exception as e:
        print(e)
        return make_response({'message': 'error'}, 400)

@app.route('/api/user/', methods=['GET'])
def get_user():
    try:
        if 'session_id' in session:
            session_id = session['session_id']
            session_data = CustomSession.get_session(session_id)
            # If session data is present then the user is authenticated
            if session_data:
                username = session_data['username']
                user_data = get_user_data(username=username)
                if user_data:   
                    return make_response({'message': 'success', 'data': user_data}, 200)
                else:
                    return make_response({'message': 'User data not found'}, 400)
            return make_response({'message': 'Not authenticated for this route'}, 400)
    except Exception as e:
        print(e)
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

@app.route('/api/crop_data/', methods=['GET'])
def get_crop():
    try:
        if 'session_id' in session:
            session_id = session['session_id']
            session_data = CustomSession.get_session(session_id)
            # If session data is present then the user is authenticated
            if session_data:
                # crop_type = eval(session_data).get('croptype')
                crop_type = session_data['data']["croptype"]
                crop_data = get_crop_data(crop_type)
                if crop_data:   
                    return make_response({'message': 'success', 'data': crop_data}, 200)
                else:
                    return make_response({'message': 'Crop data not found'}, 400)
            return make_response({'message': 'Not authenticated for this route'}, 400)
    except Exception as e:
        print(e)
        return make_response({'message': 'error'}, 400)
    
@app.route('/api/crop_data/', methods=['POST'])
def update_crop_data():
    try:
        if 'session_id' in session:
            session_id = session['session_id']
            session_data = CustomSession.get_session(session_id)
            # If session data is present then the user is authenticated
            if session_data:
                form_data = request.form
                print(form_data)
                # username = eval(session_data).get('username')
                username  = session_data["data"]['username']
                print(username)
                selected_crop = form_data['croptype']
                quantity = form_data['quantity']
                crop_data = update_user_crop_type(username=username, new_crop_type=selected_crop, quantity=quantity)
                if crop_data:   
                    return make_response({'message': 'success'}, 200)
                else:
                    return make_response({'message': 'Could not update crop type'}, 400)
            return make_response({'message': 'Not authenticated for this route'}, 400)
    except Exception as e:
        print(e)
        return make_response({'message': 'error'}, 400)

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








