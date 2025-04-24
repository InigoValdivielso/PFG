from typing import List
from fastapi import APIRouter, HTTPException, Depends
from requests import Session
from sqlalchemy import select
from config.db import get_db
from models.estudiante import estudiante
from models.estudiante_curso import estudiante_curso
from models.credencial import credencial
from models.solicitud import solicitud
from schemas.estudiante import EstudianteCrear, Estudiante


estudiante_routes = APIRouter()

@estudiante_routes.get("/estudiante", tags=["Gestión de estudiantes"])
def get_estudiantes(db: Session = Depends(get_db)):
    try:
        estudiantes_raw = db.execute(estudiante.select()).fetchall()
        estudiantes_list = []

        for row in estudiantes_raw:
            nia = row._mapping["NIA"]

            # Obtener cursos (solo IDs)
            cursos = db.execute(
                select(estudiante_curso.c.curso_id).where(estudiante_curso.c.estudiante_id == nia)
            ).scalars().all()

            # Obtener credenciales (solo IDs)
            credenciales = db.execute(
                select(credencial.c.id).where(credencial.c.estudiante_id == nia)
            ).scalars().all()

            estudiante_data = dict(row._mapping)
            estudiante_data["cursos"] = cursos
            estudiante_data["credenciales"] = credenciales

            estudiantes_list.append(Estudiante(**estudiante_data))

        return estudiantes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@estudiante_routes.post("/estudiante", tags=["Gestión de estudiantes"])
def create_estudiante(estudiante_data: EstudianteCrear, db: Session = Depends(get_db)):
    try:
        datos = estudiante_data.dict()
        
        # Separar los campos del estudiante de los relacionados
        cursos_ids = datos.pop("cursos", [])
        credenciales_ids = datos.pop("credenciales", [])

        # Insertar el estudiante
        result = db.execute(estudiante.insert().values(datos))
        nuevo_nia = result.inserted_primary_key[0]
        db.commit()

        # Insertar en tabla intermedia estudiante_curso
        for curso_id in cursos_ids:
            db.execute(estudiante_curso.insert().values(nia_estudiante=nuevo_nia, id_curso=curso_id))

        
        for cred_id in credenciales_ids:
           db.execute(credencial.update().where(credencial.c.id == cred_id).values(estudiante_id=nuevo_nia))

        db.commit()

        return {"status": "Estudiante creado", "nia": nuevo_nia}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante_routes.delete("/estudiante/{nia}", tags=["Gestión de estudiantes"])
def borrar_estudiante(nia: int, db: Session = Depends(get_db)):
    estudiante_data = db.execute(
        select(estudiante).where(estudiante.c.NIA == nia)
    ).fetchone()

    if not estudiante_data:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")

    # Si tienes relaciones, borra de las tablas intermedias si es necesario

    db.execute(
        estudiante.delete().where(estudiante.c.NIA == nia)
    )
    db.commit()
    
    return {"message": f"Estudiante con NIA {nia} eliminado correctamente"}

@estudiante_routes.put("/estudiante/{nia}", tags=["Gestión de estudiantes"])
def actualizar_estudiante(nia: int, estudiante_actu: EstudianteCrear, db: Session = Depends(get_db)):
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

        db.execute(
            estudiante.update().where(estudiante.c.NIA == nia).values(valores_actualizar)
        )
        db.commit()
        return {"status": "Estudiante actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
    
    
@estudiante_routes.get("/estudiantes/{nia}/credenciales", tags=["Gestión de estudiantes"])
def obtener_credenciales_estudiante(nia: int, db: Session = Depends(get_db)):
    result = db.execute(credencial.select().where(credencial.c.estudiante_id == nia)).fetchall()

    if not result:
        raise HTTPException(status_code=404, detail="El estudiante no tiene ninguna credencial")

    return [dict(row._mapping) for row in result]

@estudiante_routes.put("/estudiante/{nia}/credenciales", tags=["Gestión de estudiantes"])
def añadir_credenciales(nia: int, credenciales: List[str], db: Session = Depends(get_db)):
    try:
        for cred_id in credenciales:
            db.execute(
                credencial.update()
                .where(credencial.c.id == cred_id)
                .values(estudiante_id=nia)
            )
        db.commit()
        return {"status": f"Credenciales {credenciales} añadidas al estudiante con NIA {nia}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@estudiante_routes.post("/estudiante/{nia}/cursos", tags=["Gestión de estudiantes"])
def añadir_cursos(nia: int, cursos: List[int], db: Session = Depends(get_db)):
    try:
        for curso_id in cursos:
            db.execute(
                estudiante_curso.insert().values(nia=nia, curso_id=curso_id)
            )
        db.commit()
        return {"status": f"Cursos {cursos} añadidos al estudiante con NIA {nia}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))