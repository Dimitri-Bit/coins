from pydantic import BaseModel,Field, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=5, max_length=50);

    class Config:
        orm_mode = True;
