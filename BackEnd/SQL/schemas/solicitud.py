from pydantic import BaseModel

class SolicitudCrear(BaseModel):
    id_curso: int
    id_solicitud_doc: str
    estado: str
    did: str

class Solicitud(BaseModel):
    id: int
    id_curso: int
    id_solicitud_doc: str
    estado: str
    did: str
    
    class Config:
        from_attributes = True
