from typing import Optional, List
from pydantic import BaseModel

class Curso(BaseModel):
    nombre: str
    descripcion: str
    duracion: str
    requisitos: Optional[List[int]] = []

    class Config:
        orm_mode = True