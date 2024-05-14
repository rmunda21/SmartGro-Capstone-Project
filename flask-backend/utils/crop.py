from utils.db import connect_to_mongodb

def get_crop_data(cropname: str):
    try:
        db = connect_to_mongodb()
        collection = db['CropData']
        crop_data = collection.find_one({},{cropname.lower()})
        crop_data.pop('_id')
        
        print(crop_data)
        if crop_data:
            return crop_data[cropname]
        return None
    except Exception as e:
        print(e)
        return None
def update_user_crop_type(username, new_crop_type: str, quantity):
    try:
        db = connect_to_mongodb()
        collection = db['UserData']
        newvalue = { "$set": { 'croptype': new_crop_type.lower() , 'quantity': quantity} }
        collection.update_one({'username': username}, newvalue)
        return True
    except Exception as e:
        print(e)
        return None