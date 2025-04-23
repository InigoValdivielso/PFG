from typing import Optional
from pydantic import BaseModel

class SolicitudCrear(BaseModel):
    id_curso: int
    id_solicitud_doc: str
    estado: str
    id_persona: int


class Solicitud(BaseModel):
    id: int
    id_curso: int
    id_solicitud_doc: str
    estado: str
    id_persona: int
    
    class Config:
        from_attributes = True

class SolicitudActualizar(BaseModel):
    estado: Optional[str] = None
