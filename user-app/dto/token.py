from pydantic import BaseModel

class Token(BaseModel):
    access_toen: str
    token_type: str
