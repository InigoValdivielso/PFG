from pydantic import BaseModel

class Credencial(BaseModel):
    id: str
    estudiante_id: int
