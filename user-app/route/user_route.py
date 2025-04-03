from fastapi import APIRouter
from typing import Annotated
from fastapi.params import Depends

from dto.register_request import RegisterRequest
from model.user_model import User
from service.user_service import UserService
from dto.user_response import UserResponse

router = APIRouter();

@router.post("/user", response_model=UserResponse)
def add_user(register_request: RegisterRequest, service: Annotated[UserService, Depends(UserService)]) -> User:
    return service.add_user(register_request);

@router.get("/user/{email}", response_model=UserResponse)
def get_user_by_email(email: str, service: Annotated[UserService, Depends(UserService)]):
    print("Fuck")
    return service.get_user_by_email(email);
