from .base import Base
from model.user_model import User

class UserRepository(Base):
    pass

    def add_user(self, user: User) -> User:
        self.db.add(user);
        self.db.flush();
        self.db.commit();
        return user;

    def get_user_by_email(self, email: str):
        db_user = self.db.query(User).filter(User.email == email).first();
        return db_user;
