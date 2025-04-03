from pydantic import BaseModel

class PermissionResponse(BaseModel):
    name: str
