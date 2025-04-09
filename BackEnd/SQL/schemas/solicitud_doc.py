from pydantic import BaseModel

class Solicitud_doc(BaseModel):
    solicitud_id: int
    credencial_id: int

    class Config:
        orm_mode = True
