from typing import List
from fastapi import APIRouter, HTTPException, Depends, Query
from requests import Session
from sqlalchemy import select, update
from config.db import get_db
from models.estudiante import estudiante
from models.estudiante_curso import estudiante_curso
from models.credencial import credencial
from models.solicitud import solicitud
from models.solicitud_doc import solicitud_doc
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

@estudiante_routes.get("/estudiante/correo", tags=["Gestión de estudiantes"])
def get_estudiante_by_email(correo: str = Query(...), db: Session = Depends(get_db)):
    try:
        # Obtener estudiante por email
        estudiante_row = db.execute(
            select(estudiante).where(estudiante.c.correo == correo)
        ).fetchone()

        if not estudiante_row:
            raise HTTPException(status_code=404, detail="Estudiante no encontrado")

        nia = estudiante_row._mapping["NIA"]

        # Obtener cursos
        cursos = db.execute(
            select(estudiante_curso.c.curso_id).where(estudiante_curso.c.estudiante_id == nia)
        ).scalars().all()

        # Obtener credenciales
        credenciales = db.execute(
            select(credencial.c.id).where(credencial.c.estudiante_id == nia)
        ).scalars().all()

        estudiante_data = dict(estudiante_row._mapping)
        estudiante_data["cursos"] = cursos
        estudiante_data["credenciales"] = credenciales

        return Estudiante(**estudiante_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@estudiante_routes.post("/estudiante", tags=["Gestión de estudiantes"])
def create_estudiante(estudiante_data: EstudianteCrear, db: Session = Depends(get_db)):
    try:
        datos = estudiante_data.dict()
        
        existing_estudiante = db.query(estudiante).filter(estudiante.c.did == estudiante_data.did).first()
        if existing_estudiante:
            raise HTTPException(status_code=400, detail=f"El estudiante con did '{datos.get('did')}' ya existe.")


        # Separar los campos del estudiante de los relacionados
        cursos_ids = datos.pop("cursos", [])
        credenciales_ids = datos.pop("credenciales", [])

        # Insertar el estudiante
        result = db.execute(estudiante.insert().values(datos))
        nuevo_nia = result.inserted_primary_key[0]
        db.commit()

        # Insertar en tabla intermedia estudiante_curso
        for curso_id in cursos_ids:
            db.execute(estudiante_curso.insert().values(estudiante_id=nuevo_nia, curso_id=curso_id, estado="en proceso"))

        
        for cred_id in credenciales_ids:
           db.execute(credencial.update().where(credencial.c.id == cred_id).values(estudiante_id=nuevo_nia))

        db.commit()

        return {"status": "Estudiante creado", "nia": nuevo_nia}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@estudiante_routes.get("/estudiante/{curso_id}", tags=["Gestión de estudiantes"])
def get_estudiantes_con_estado_por_curso(curso_id: int, db: Session = Depends(get_db)):
    try:
        # Selecciona información del estudiante y el estado de la tabla intermedia
        query = select(
            estudiante.c.NIA,
            estudiante.c.nombre,
            estudiante.c.primer_apellido,
            estudiante.c.segundo_apellido,
            estudiante.c.correo,
            estudiante.c.dni,
            estudiante.c.did,
            estudiante_curso.c.estado.label("estado_curso")
        ).join(
            estudiante_curso, estudiante.c.NIA == estudiante_curso.c.estudiante_id
        ).where(
            estudiante_curso.c.curso_id == curso_id
        )

        result = db.execute(query).fetchall()
        estudiantes_con_estado = [row._mapping for row in result]

        return {"curso_id": curso_id, "estudiantes": estudiantes_con_estado}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@estudiante_routes.put("/estudiante/{estudiante_id}/curso/{curso_id}/estado", tags=["Gestión de estados"])
def actualizar_estado_estudiante_curso(estudiante_id: int, curso_id: int, nuevo_estado: str, db: Session = Depends(get_db)):
    try:
        query = update(estudiante_curso).where(
            (estudiante_curso.c.estudiante_id == estudiante_id) & (estudiante_curso.c.curso_id == curso_id)
        ).values(estado=nuevo_estado)
        result = db.execute(query)
        db.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="No se encontró la relación estudiante-curso")

        return {"message": f"Estado actualizado a '{nuevo_estado}' para el estudiante {estudiante_id} en el curso {curso_id}"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@estudiante_routes.delete("/estudiante/{nia}", tags=["Gestión de estudiantes"])
def borrar_estudiante(nia: int, db: Session = Depends(get_db)):
    estudiante_data = db.execute(
        select(estudiante).where(estudiante.c.NIA == nia)
    ).fetchone()

    if not estudiante_data:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")

    db.execute(estudiante_curso.delete().where(estudiante_curso.c.estudiante_id == nia))
    db.commit()

    credenciales_a_borrar = db.execute(
        select(credencial.c.id).where(credencial.c.estudiante_id == nia)
    ).scalars().all()


    for credencial_id in credenciales_a_borrar:
        db.execute(solicitud_doc.delete().where(solicitud_doc.c.id_credencial == credencial_id))
    db.commit()


    db.execute(credencial.delete().where(credencial.c.estudiante_id == nia))
    db.commit()

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