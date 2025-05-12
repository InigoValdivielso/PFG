from fastapi import APIRouter, HTTPException, Depends
from requests import Session
from sqlalchemy import select
from config.db import get_db
from models.credencial import credencial
from models.estudiante import estudiante
from schemas.credencial import Credencial

credencial_routes = APIRouter()

@credencial_routes.get("/credenciales", tags=["Gestión de credenciales"])
def get_credenciales(db: Session = Depends(get_db)):
    try:
        result = db.execute(credencial.select()).fetchall()
        credenciales_list = [Credencial.from_orm(dict(row._mapping)) for row in result]
        return credenciales_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@credencial_routes.get("/credenciales/{credencial_id}", tags=["Gestión de credenciales"])
def get_credencial_by_id(credencial_id: str, db: Session = Depends(get_db)):
    try:
        result = db.execute(
            select(credencial).where(credencial.c.id == credencial_id)
        ).fetchone()

        if not result:
            raise HTTPException(status_code=404, detail=f"Credencial con ID '{credencial_id}' no encontrada")

        credencial_row = result._mapping["Credencial"]
        return Credencial.from_orm(credencial_row)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
@credencial_routes.get("/credenciales/{did}", tags=["Gestión de credenciales"])
def get_credenciales_por_did(did: str, db: Session = Depends(get_db)):
    try:
        
        estudiante_result = db.execute(
            estudiante.select().where(estudiante.c.did == did)
        ).fetchone()

        if estudiante_result is None:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")

        nia = estudiante_result._mapping["NIA"]

        
        cred_result = db.execute(
            credencial.select().where(credencial.c.estudiante_id == nia)
        ).fetchall()

        credenciales_list = [Credencial.from_orm(dict(row._mapping)) for row in cred_result]
        return credenciales_list

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@credencial_routes.post("/credencial", tags=["Gestión de credenciales"])
def insertar_credencial(credencial_data: Credencial, db: Session = Depends(get_db)):
    try:
        new_credencial = credencial_data.dict()
        result = db.execute(credencial.insert().values(new_credencial))
        db.commit()  
        return {"status": "Credencial insertada", "credencial_id": result.inserted_primary_key[0] if result.inserted_primary_key else None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@credencial_routes.delete("/credencial/{id}", tags=["Gestión de credenciales"])
def eliminar_credencial(id: str, db: Session = Depends(get_db)):
    try:
        result = db.execute(credencial.delete().where(credencial.c.id == id))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Credencial no encontrada")
        db.commit()  
        return {"status": "Credencial eliminada", "id": id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
