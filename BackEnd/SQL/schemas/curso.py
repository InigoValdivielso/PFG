from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class Curso(BaseModel):
    nombre: str
    descripcion: str
    duracion: str
    requisitos: Optional[List[int]] = []

    model_config = ConfigDict(from_attributes=True)

class CursoID(BaseModel):
    id: int

    model_config = ConfigDict(from_attributes=True)