from fastapi import APIRouter, HTTPException, Depends
from requests import Session
from config.db import get_db
from models.curso import curso
from models.solicitud import solicitud
from models.solicitud_doc import solicitud_doc
from schemas.solicitud import Solicitud, SolicitudCrear, SolicitudActualizar

solicitud_routes = APIRouter()

@solicitud_routes.get("/solicitudes", tags=["Gestión de solicitudes"])
def get_solicitudes(db: Session = Depends(get_db)):
    try:
        result = db.execute(solicitud.select()).fetchall()
        solicitudes_list = []

        for row in result:
            solicitud_dict = dict(row._mapping)
            solicitud_id = solicitud_dict.get('id')

            # Obtener las credenciales asociadas a la solicitud
            credenciales = db.execute(
                solicitud_doc.select().where(solicitud_doc.c.id_solicitud == solicitud_id)
            ).mappings().fetchall()

            solicitud_dict['credenciales'] = [cred['id_credencial'] for cred in credenciales]

            solicitudes_list.append(solicitud_dict)

        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@solicitud_routes.get("/solicitudes_por_curso", tags=["Gestión de solicitudes"])
def get_solicitudes_por_curso(id_curso: int, db: Session = Depends(get_db)):
    try:
        result = db.execute(
            solicitud.select().where(solicitud.c.id_curso == id_curso)
        ).fetchall()

        solicitudes_list = []

        for row in result:
            solicitud_dict = dict(row._mapping)
            solicitud_id = solicitud_dict.get('id')

            # Obtener las credenciales asociadas a la solicitud
            credenciales = db.execute(
                solicitud_doc.select().where(solicitud_doc.c.id_solicitud == solicitud_id)
            ).fetchall()

            solicitud_dict['credenciales'] = [cred[1] for cred in credenciales]

            solicitudes_list.append(solicitud_dict)

        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@solicitud_routes.post("/solicitud", tags=["Gestión de solicitudes"])
def insertar_solicitud(solicitud_data: SolicitudCrear, db: Session = Depends(get_db)):
    try:
        # Verificar si el curso existe
        curso_existente = db.execute(
            curso.select().where(curso.c.id == solicitud_data.id_curso)
        ).fetchone()

        if not curso_existente:
            raise HTTPException(
                status_code=400,
                detail=f"El curso con ID {solicitud_data.id_curso} no existe."
            )
        
        # Verificar si ya existe una solicitud para la persona y el curso
        solicitud_existente = db.execute(
            solicitud.select().where(
                solicitud.c.id_curso == solicitud_data.id_curso,
                solicitud.c.id_persona == solicitud_data.id_persona
            )
        ).fetchone()

        if solicitud_existente:
            raise HTTPException(
                status_code=400,
                detail="Ya existe una solicitud para este curso con la misma persona."
            )

        # Insertar la solicitud en la tabla "solicitud"
        new_solicitud = solicitud_data.dict(exclude_unset=True)
        del new_solicitud["credenciales"]  # Eliminar el campo "credenciales" de la inserción
        result = db.execute(solicitud.insert().values(new_solicitud))
        db.commit()

        solicitud_id = result.inserted_primary_key[0] if result.inserted_primary_key else None

        # Insertar las credenciales en la tabla intermedia "solicitud_doc"
        if solicitud_data.credenciales:
            for credencial_id in solicitud_data.credenciales:
                db.execute(
                    solicitud_doc.insert().values(id_solicitud=solicitud_id, id_credencial=credencial_id)
                )
            db.commit()

        return {
            "status": "Solicitud insertada",
            "solicitud_id": solicitud_id
        }

    except HTTPException as http_exc:
        raise http_exc  

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
@solicitud_routes.delete("/solicitud/{id}", tags=["Gestión de solicitudes"])
def eliminar_solicitud(id: int, db: Session = Depends(get_db)):
    try:
        db.execute(
            solicitud_doc.delete().where(solicitud_doc.c.id_solicitud == id)
        )
        db.commit()

        # Luego, eliminamos la solicitud principal
        result = db.execute(
            solicitud.delete().where(solicitud.c.id == id)
        )
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")
        db.commit()
        return {"status": "Solicitud y sus relaciones eliminadas", "solicitud_id": id}
    except Exception as e:
        db.rollback()  # Importante hacer rollback en caso de error
        raise HTTPException(status_code=500, detail=str(e))

@solicitud_routes.put("/solicitud/{id}", tags=["Gestión de solicitudes"])
def update_solicitud(id: int, solicitud_data: SolicitudActualizar, db: Session = Depends(get_db)):
    try:
        update_values = solicitud_data.dict(exclude_unset=True)

        # Actualizar la solicitud
        result = db.execute(
            solicitud.update().where(solicitud.c.id == id).values(update_values)
        )

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")

        # Actualizar las credenciales asociadas
        if 'credenciales' in update_values:
            # Primero eliminamos las credenciales asociadas
            db.execute(
                solicitud_doc.delete().where(solicitud_doc.c.id_solicitud == id)
            )

            # Insertar las nuevas credenciales
            for credencial_id in update_values['credenciales']:
                db.execute(
                    solicitud_doc.insert().values(id_solicitud=id, id_credencial=credencial_id)
                )

        db.commit()
        return {"status": "Solicitud actualizada", "solicitud_id": id}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
