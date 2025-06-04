from typing import List, Literal, Optional
from pydantic import BaseModel, ConfigDict

class SolicitudCrear(BaseModel):
    id_curso: int
    estado: Literal["pendiente", "aceptada", "rechazada"]
    id_persona: int
    credenciales: Optional[List[str]] = []

class Solicitud(BaseModel):
    id: int
    id_curso: int
    estado: Literal["pendiente", "aceptada", "rechazada"]
    id_persona: int
    credenciales: Optional[List[str]] = []
    
    model_config = ConfigDict(from_attributes=True)

class SolicitudActualizar(BaseModel):
    estado: Optional[Literal["pendiente", "aceptada", "rechazada"]] = None
