from pydantic import BaseModel,Field, EmailStr

class RegisterRequest(BaseModel):
    name: str = Field(min_length=3, max_length=35);
    email: EmailStr
    surname: str = Field(min_length=3, max_length=35);
    password: str = Field(min_length=5, max_length=50);

    class Config:
        orm_mode = True;
