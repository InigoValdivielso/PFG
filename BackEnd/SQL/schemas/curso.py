from typing import Optional, List
from pydantic import BaseModel

class Curso(BaseModel):
    nombre: str
    descripcion: str
    duracion: str
    requisitos: Optional[List[int]] = []

    class Config:
        from_attributes = True

class CursoID(BaseModel):
    id: int

    class Config:
        from_attributes = True