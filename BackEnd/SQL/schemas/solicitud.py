from pydantic import BaseModel

class Solicitud(BaseModel):
    id_curso: int
    id_solicitud_doc: int
    estado: str
    did: str

    class Config:
        orm_mode = True
