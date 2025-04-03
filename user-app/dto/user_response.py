from pydantic import BaseModel
from .roles_response import RolesResponse

class UserResponse(BaseModel):
    name: str;
    surname: str;
    roles: list[RolesResponse]

    class Config:
        orm_mode = True;
