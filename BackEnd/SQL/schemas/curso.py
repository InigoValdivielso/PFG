from typing import Optional
from pydantic import BaseModel

class Curso(BaseModel):
    nombre: str

    class Config:
        orm_mode = True