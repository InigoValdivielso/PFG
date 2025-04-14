from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.estudiante import estudiante
from models.estudiante_curso import estudiante_curso
from models.credencial import credencial
from schemas.estudiante import Estudiante

estudiante_routes = APIRouter()

@estudiante_routes.get("/estudiante", tags=["Gestión de estudiantes"])
def get_estudiantes():
    try:
        result = conexion.execute(estudiante.select()).fetchall()
        estudiantes_list = [Estudiante.from_orm(dict(row._mapping)) for row in result]
        return estudiantes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante_routes.post("/estudiante", tags=["Gestión de estudiantes"])
def create_estudiante(estudiante_data: Estudiante):
    try:
        datos = estudiante_data.dict()
        
        # Separar los campos del estudiante de los relacionados
        cursos_ids = datos.pop("cursos", [])
        credenciales_ids = datos.pop("credenciales", [])

        # Insertar el estudiante
        result = conexion.execute(estudiante.insert().values(datos))
        nuevo_nia = result.inserted_primary_key[0]
        conexion.commit()

        # Insertar en tabla intermedia estudiante_curso
        for curso_id in cursos_ids:
            conexion.execute(estudiante_curso.insert().values(nia_estudiante=nuevo_nia, id_curso=curso_id))

        
        for cred_id in credenciales_ids:
           conexion.execute(credencial.update().where(credencial.c.id == cred_id).values(estudiante_id=nuevo_nia))

        conexion.commit()

        return {"status": "Estudiante creado", "nia": nuevo_nia}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante_routes.delete("/estudiante", tags=["Gestión de estudiantes"])
def delete_estudiante(estudiante_data: Estudiante):
    try:
        result = conexion.execute(estudiante.delete().where(estudiante.c.nia == estudiante_data.nia))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")
        conexion.commit()  
        return {"status": "Estudiante eliminado", "nia": estudiante_data.nia}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante_routes.put("/estudiante", tags=["Gestión de estudiantes"])
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
    
@estudiante_routes.get("/estudiantes/{nia}/credenciales", tags=["Gestión de estudiantes"])
def obtener_credenciales_estudiante(nia: int):
    result = conexion.execute(credencial.select().where(credencial.c.estudiante_id == nia)).fetchall()
    return [dict(row) for row in result]
