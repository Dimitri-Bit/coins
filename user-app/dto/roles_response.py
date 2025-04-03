from pydantic import BaseModel
from .permissions_response import PermissionResponse

class RolesResponse(BaseModel):
    name: str
    permissions: list[PermissionResponse]
