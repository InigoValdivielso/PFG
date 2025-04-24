from typing import Optional
from pydantic import BaseModel

class Credencial(BaseModel):
    id: str
    estudiante_id: Optional[int] = None

    class Config:
        from_attributes = True

class CredencialID(BaseModel):
    id: str

    class Config:
        from_attributes = True