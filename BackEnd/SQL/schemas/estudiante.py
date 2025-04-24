from typing import Optional, List
from pydantic import BaseModel


class EstudianteCrear(BaseModel):
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    correo: str
    dni: str
    genero: str
    did: Optional[str] = None
    cursos: Optional[List[int]] = []
    credenciales: Optional[List[str]] = []

class Estudiante(BaseModel):
    NIA: int
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    correo: str
    dni: str
    genero: str
    did: Optional[str] = None
    cursos: Optional[List[int]] = []
    credenciales: Optional[List[str]] = []

    class Config:
        from_attributes = True