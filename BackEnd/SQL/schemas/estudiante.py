from typing import Optional, List
from pydantic import BaseModel

class Estudiante(BaseModel):
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    correo: str
    nia: int
    dni: str
    genero: str
    did: Optional[str]
    cursos: Optional[List[int]] = []
    credenciales: Optional[List[int]] = []

    class Config:
        orm_mode = True