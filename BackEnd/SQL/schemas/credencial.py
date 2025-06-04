from typing import Optional
from pydantic import BaseModel, ConfigDict


class Credencial(BaseModel):
    id: str
    estado: str
    estudiante_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)

class CredencialID(BaseModel):
    id: str

    model_config = ConfigDict(from_attributes=True)