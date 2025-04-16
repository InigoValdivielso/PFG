from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.estudiante import estudiante
from models.estudiante_curso import estudiante_curso
from models.credencial import credencial
from models.solicitud import solicitud
from schemas.estudiante import EstudianteCrear, Estudiante

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
def create_estudiante(estudiante_data: EstudianteCrear):
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

@estudiante_routes.delete("/estudiante/{nia}", tags=["Gestión de estudiantes"])
def borrar_estudiante(nia: int):
    estudiante_data = conexion.execute(
        select(estudiante).where(estudiante.c.NIA == nia)
    ).fetchone()

    if not estudiante_data:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")

    # Si tienes relaciones, borra de las tablas intermedias si es necesario

    conexion.execute(
        estudiante.delete().where(estudiante.c.NIA == nia)
    )
    conexion.commit()
    
    return {"message": f"Estudiante con NIA {nia} eliminado correctamente"}

@estudiante_routes.put("/estudiante/{nia}", tags=["Gestión de estudiantes"])
def actualizar_estudiante(nia: int, estudiante_actu: EstudianteCrear):
    try:
        valores_actualizar = {
            "nombre": estudiante_actu.nombre,
            "primer_apellido": estudiante_actu.primer_apellido,
            "segundo_apellido": estudiante_actu.segundo_apellido,
            "correo": estudiante_actu.correo,
            "dni": estudiante_actu.dni,
            "genero": estudiante_actu.genero,
            "did": estudiante_actu.did 
        }

        conexion.execute(
            estudiante.update().where(estudiante.c.NIA == nia).values(valores_actualizar)
        )
        conexion.commit()
        return {"status": "Estudiante actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
    
    
@estudiante_routes.get("/estudiantes/{nia}/credenciales", tags=["Gestión de estudiantes"])
def obtener_credenciales_estudiante(nia: int):
    result = conexion.execute(credencial.select().where(credencial.c.estudiante_id == nia)).fetchall()

    if not result:
        raise HTTPException(status_code=404, detail="El estudiante no tiene ninguna credencial")

    return [dict(row) for row in result]

def añadir_credenciales(nia: int, credenciales: List[int]):
    try:
        for cred_id in credenciales:
            conexion.execute(
                credencial.update()
                .where(credencial.c.id == cred_id)
                .values(estudiante_nia=nia)
            )
        conexion.commit()
        return {"status": f"Credenciales {credenciales} añadidas al estudiante con NIA {nia}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@estudiante_routes.post("/estudiante/{nia}/cursos", tags=["Gestión de estudiantes"])
def añadir_cursos(nia: int, cursos: List[int]):
    try:
        for curso_id in cursos:
            conexion.execute(
                estudiante_curso.insert().values(nia=nia, curso_id=curso_id)
            )
        conexion.commit()
        return {"status": f"Cursos {cursos} añadidos al estudiante con NIA {nia}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))