from sqlalchemy import Column, Integer, String
from .base import Base
from sqlalchemy.orm import relationship
from .role_user import role_user

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    name = Column(String(35), nullable=False)
    surname = Column(String(35), nullable=False)
    password = Column(String(50), nullable=False)
    roles = relationship(
        "Role",
        secondary=role_user,
        backref="parents"
    )
