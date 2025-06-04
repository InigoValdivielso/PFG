from typing import Optional
from pydantic import BaseModel, ConfigDict

class Secretaria(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    password: str

    model_config = ConfigDict(from_attributes=True)
        
class LoginRequest(BaseModel):
    username: str
    password: str
        