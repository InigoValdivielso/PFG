from pydantic import BaseModel

class Solicitud(BaseModel):
    id_curso: int
    did: str

    class Config:
        orm_mode = True
