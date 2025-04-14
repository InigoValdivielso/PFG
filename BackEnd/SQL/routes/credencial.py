from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.credencial import credencial
from models.estudiante import estudiante
from schemas.credencial import Credencial

credencial_routes = APIRouter()

@credencial_routes.get("/credenciales", tags=["Gestión de credenciales"])
def get_credenciales():
    try:
        result = conexion.execute(credencial.select()).fetchall()
        credenciales_list = [Credencial.from_orm(dict(row._mapping)) for row in result]
        return credenciales_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@credencial_routes.get("/credenciales/{did}", tags=["Gestión de credenciales"])
def get_credenciales_por_did(did: str):
    try:
        
        estudiante_result = conexion.execute(
            estudiante.select().where(estudiante.c.did == did)
        ).fetchone()

        if estudiante_result is None:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")

        nia = estudiante_result._mapping["NIA"]

        
        cred_result = conexion.execute(
            credencial.select().where(credencial.c.estudiante_id == nia)
        ).fetchall()

        credenciales_list = [Credencial.from_orm(dict(row._mapping)) for row in cred_result]
        return credenciales_list

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@credencial_routes.post("/credencial", tags=["Gestión de credenciales"])
def insertar_credencial(credencial_data: Credencial):
    try:
        new_credencial = credencial_data.dict()
        result = conexion.execute(credencial.insert().values(new_credencial))
        conexion.commit()  
        return {"status": "Credencial insertada", "credencial_id": result.inserted_primary_key[0] if result.inserted_primary_key else None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@credencial_routes.delete("/credencial", tags=["Gestión de credenciales"])
def eliminar_credencial(credencial_data: Credencial):
    try:
        result = conexion.execute(credencial.delete().where(credencial.c.id == credencial_data.id))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Credencial no encontrada")
        conexion.commit()  
        return {"status": "Credencial eliminada", "id": credencial_data.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
