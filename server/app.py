from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from models import db, User
from utils import calculate_daily_interest
from flask_migrate import Migrate
from models import db




app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5433/circlehustle' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  

migrate = Migrate(app, db)


db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


scheduler = BackgroundScheduler()
scheduler.add_job(func=calculate_daily_interest, trigger="interval", days=1, args=[app])
scheduler.start()


@app.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return jsonify({'message': 'Request must be JSON'}), 400
    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    initial_deposit = data.get('initial_deposit', 0.0)

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists!'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, password=hashed_password, deposit=initial_deposit, last_interest_date=datetime.utcnow())
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200

    return jsonify({'message': 'Invalid credentials!'}), 401

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user:
        return jsonify({
            'username': user.username,
            'deposit': user.deposit,
            'last_interest_date': user.last_interest_date
        }), 200

    return jsonify({'message': 'User not found!'}), 404


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
