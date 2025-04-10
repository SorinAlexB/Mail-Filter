from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client['clients']
collection = db['credentials']

# TODO: use a cryptographic algorithm to create cyphers for database
def db_insert(collection, name, password, email, app_pass) -> None:
    collection.insert_one({"name" : name,
                           "password" : password,
                           "email" : email,
                           "app_pass" : app_pass,})
    return None

def db_delete(collection, email) -> None:
    collection.delete_one({"email" : email})
    return None