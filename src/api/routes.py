"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

app = Flask(__name__)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    email = body.get('email')
    password = body.get('password')
    password2 = body.get('password2')

    if email is None or password is None or password2 is None:
        return jsonify({"msg": "Email o password incorrectos", "data": None}), 400
    # Validad email y password != None
    # Después es recomendable poner , y un código 

    if len(password) < 4:
        return jsonify({"msg": "Tamaño del password incorrectos", "data": None}), 400

    if password != password2:
        return jsonify({"msg": "TLos password no son iguales", "data": None}), 400   

    hash = bcrypt.generate_password_hash(password)
    print(hash)

    user = User(
        email = email,
        password = hash.decode('utf-8'),
        is_active = True,
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": None, "data": user.serialize()}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    email = body.get('email')
    password = body.get('password')
    # Validad email y password != None

    users = User.query.filter_by(email=email).all()

    if(len(users) == 0):
        return jsonify({"msg":"El usuario con email: " + email + " no existe", "data": None})

    user = users[0]
    hash = user.password
    isValid = bcrypt.check_password_hash(hash,password)

    if not isValid:
        return jsonify({"msg":"Clave incorrecta", "data":None})

    token = create_access_token(identity=user.serialize())
    return jsonify({"msg":None, "data": token})

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    data = get_jwt_identity()
    print(data)
    return jsonify(data)