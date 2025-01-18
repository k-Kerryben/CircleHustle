from models import db, User
from datetime import datetime

def calculate_daily_interest(app):
    with app.app_context():
        users = User.query.all()
        interest_rate = 0.01  # 1% daily interest (example)

        for user in users:
            days_since_last_interest = (datetime.utcnow() - user.last_interest_date).days

            if days_since_last_interest > 0:
                user.deposit += user.deposit * interest_rate * days_since_last_interest
                user.last_interest_date = datetime.utcnow()

        db.session.commit()
