from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.solicitud import solicitud
from schemas.solicitud import Solicitud

solicitud = APIRouter()