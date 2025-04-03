from typing import Annotated

from fastapi.params import Depends
from repository.user_repository import UserRepository

from dto.register_request import RegisterRequest
from model.user_model import User

class UserService:
    def __init__(self, repository: Annotated[UserRepository, Depends(UserRepository)]):
        self.repository = repository;

    def add_user(self, register_request:RegisterRequest) -> User:
        db_user = self.map_register_request(register_request);
        return self.repository.add_user(db_user);

    def get_user_by_email(self, email:str):
        return self.repository.get_user_by_email(email);

    def map_register_request(self, register_request:RegisterRequest) -> User:
        return User(
            email=register_request.email,
            name=register_request.name,
            surname=register_request.surname,
            password=register_request.password
        );
