from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.credencial import credencial
from schemas.credencial import Credencial

credencial = APIRouter()