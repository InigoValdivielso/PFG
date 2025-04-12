from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.estudiante import estudiante
from models.credencial import credencial
from schemas.estudiante import Estudiante

estudiante = APIRouter()

@estudiante.get("/estudiante", tags=["Gestión de estudiantes"])
def get_estudiantes():
    try:
        result = conexion.execute(estudiante.select()).fetchall()
        estudiantes_list = [Estudiante.from_orm(dict(row._mapping)) for row in result]
        return estudiantes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante.post("/estudiante", tags=["Gestión de estudiantes"])
def create_estudiante(estudiante_data: Estudiante):
    try:
        new_estudiante = estudiante_data.dict()
        result = conexion.execute(estudiante.insert().values(new_estudiante))
        conexion.commit()  
        return {"status": "Estudiante creado", "estudiante_id": result.inserted_primary_key[0] if result.inserted_primary_key else None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante.delete("/estudiante", tags=["Gestión de estudiantes"])
def delete_estudiante(estudiante_data: Estudiante):
    try:
        result = conexion.execute(estudiante.delete().where(estudiante.c.nia == estudiante_data.nia))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")
        conexion.commit()  
        return {"status": "Estudiante eliminado", "nia": estudiante_data.nia}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante.put("/estudiante", tags=["Gestión de estudiantes"])
def update_estudiante(estudiante_data: Estudiante):
    try:
        update_values = estudiante_data.dict(exclude_unset=True)
        result = conexion.execute(estudiante.update().where(estudiante.c.nia == estudiante_data.nia).values(update_values))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")
        conexion.commit()  
        return {"status": "Estudiante actualizado", "nia": estudiante_data.nia}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@estudiante.get("/estudiantes/{nia}/credenciales")
def obtener_credenciales_estudiante(nia: int):
    result = conexion.execute(credencial.select().where(credencial.c.estudiante_id == nia)).fetchall()
    return [dict(row) for row in result]
