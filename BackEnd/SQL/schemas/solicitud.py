from typing import List, Optional
from pydantic import BaseModel

class SolicitudCrear(BaseModel):
    id_curso: int
    estado: str
    id_persona: int
    credenciales: Optional[List[str]] = []

class Solicitud(BaseModel):
    id: int
    id_curso: int
    estado: str
    id_persona: int
    credenciales: Optional[List[str]] = []
    
    class Config:
        from_attributes = True

class SolicitudActualizar(BaseModel):
    estado: Optional[str] = None
