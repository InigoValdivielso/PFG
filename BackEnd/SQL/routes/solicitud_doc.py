from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.solicitud_doc import solicitud_doc
from schemas.solicitud_doc import Solicitud_doc

solicitud_doc = APIRouter()