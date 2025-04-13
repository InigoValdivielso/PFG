from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.solicitud import solicitud
from schemas.solicitud import Solicitud

solicitud = APIRouter()

@solicitud.get("/solicitudes", tags=["Gestión de solicitudes"])
def get_solicitudes():
    try:
        result = conexion.execute(solicitud.select()).fetchall()
        solicitudes_list = [Solicitud.from_orm(dict(row._mapping)) for row in result]
        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@solicitud.get("/solicitudes/{did}", tags=["Gestión de solicitudes"])
def get_solicitudes_por_did(did: str):
    try:
        result = conexion.execute(solicitud.select().where(solicitud.c.did == did)).fetchall()
        solicitudes_list = [Solicitud.from_orm(dict(row._mapping)) for row in result]
        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@solicitud.post("/solicitud", tags=["Gestión de solicitudes"])
def insertar_solicitud(solicitud_data: Solicitud):
    try:
        new_solicitud = solicitud_data.dict()
        result = conexion.execute(solicitud.insert().values(new_solicitud))
        conexion.commit()  
        return {"status": "Solicitud insertada", "solicitud_id": result.inserted_primary_key[0] if result.inserted_primary_key else None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@solicitud.delete("/solicitud", tags=["Gestión de solicitudes"])
def eliminar_solicitud(solicitud_data: Solicitud):
    try:
        result = conexion.execute(solicitud.delete().where(solicitud.c.id == solicitud_data.id))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")
        conexion.commit()  
        return {"status": "Solicitud eliminada", "solicitud_id": solicitud_data.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@solicitud.put("/solicitud", tags=["Gestión de solicitudes"])
def update_solicitud(solicitud_data: Solicitud):
    try:
        update_values = solicitud_data.dict(exclude_unset=True)
        result = conexion.execute(solicitud.update().where(solicitud.c.id == solicitud_data.id).values(update_values))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")
        conexion.commit()  
        return {"status": "Solicitud actualizada", "solicitud_id": solicitud_data.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    