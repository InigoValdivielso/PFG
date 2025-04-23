from fastapi import APIRouter, HTTPException, Depends
from requests import Session
from config.db import get_db
from models.curso import curso
from models.solicitud import solicitud
from schemas.solicitud import Solicitud, SolicitudCrear, SolicitudActualizar

solicitud_routes = APIRouter()

@solicitud_routes.get("/solicitudes", tags=["Gestión de solicitudes"])
def get_solicitudes(db: Session = Depends(get_db)):
    try:
        result = db.execute(solicitud.select()).fetchall()
        solicitudes_list = [Solicitud.from_orm(dict(row._mapping)) for row in result]
        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@solicitud_routes.get("/solicitudes_por_curso", tags=["Gestión de solicitudes"])
def get_solicitudes_por_curso(id_curso: int, db: Session = Depends(get_db)):
    try:
        
        result = db.execute(
            solicitud.select().where(solicitud.c.id_curso == id_curso)
        ).fetchall()

        
        solicitudes_list = [Solicitud.from_orm(dict(row._mapping)) for row in result]
        
        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@solicitud_routes.post("/solicitud", tags=["Gestión de solicitudes"])
def insertar_solicitud(solicitud_data: SolicitudCrear, db: Session = Depends(get_db)):
    try:
        print(solicitud_data)
        curso_existente = db.execute(
            curso.select().where(curso.c.id == solicitud_data.id_curso)
        ).fetchone()

        if not curso_existente:
            raise HTTPException(
                status_code=400,
                detail=f"El curso con ID {solicitud_data.id_curso} no existe."
            )

        
        new_solicitud = solicitud_data.dict()
        result = db.execute(solicitud.insert().values(new_solicitud))
        db.commit()  
        return {
            "status": "Solicitud insertada",
            "solicitud_id": result.inserted_primary_key[0] if result.inserted_primary_key else None
        }

    except HTTPException as http_exc:
        raise http_exc  

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@solicitud_routes.delete("/solicitud/{id}", tags=["Gestión de solicitudes"])
def eliminar_solicitud(id: int, db: Session = Depends(get_db)):
    try:
        result = db.execute(
            solicitud.delete().where(solicitud.c.id == id)
        )
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")
        db.commit()
        return {"status": "Solicitud eliminada", "solicitud_id": id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@solicitud_routes.put("/solicitud/{id}", tags=["Gestión de solicitudes"])
def update_solicitud(id: int, solicitud_data: SolicitudActualizar, db: Session = Depends(get_db)):
    try:
        update_values = solicitud_data.dict(exclude_unset=True)

        result = db.execute(
            solicitud.update().where(solicitud.c.id == id).values(update_values)
        )

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")

        db.commit()
        return {"status": "Solicitud actualizada", "solicitud_id": id}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))