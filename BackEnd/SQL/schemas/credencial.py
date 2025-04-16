from pydantic import BaseModel

class Credencial(BaseModel):
    id: str
    estudiante_id: int

    class Config:
        from_attributes = True