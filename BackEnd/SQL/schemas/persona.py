from datetime import date
from pydantic import BaseModel, ConfigDict

class PersonaCrear(BaseModel):
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    correo: str
    dni: str
    fecha_nacimiento: date

class Persona(BaseModel):
    id: int
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    correo: str
    dni: str
    fecha_nacimiento: date

    model_config = ConfigDict(from_attributes=True)