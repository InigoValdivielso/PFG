from typing import Optional
from pydantic import BaseModel

class Secretaria(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True  
        from_attributes = True
        
class LoginRequest(BaseModel):
    username: str
    password: str
        