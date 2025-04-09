from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.curso import curso
from schemas.curso import Curso

curso = APIRouter()