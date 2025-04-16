from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from config.db import conexion
from models.curso import curso
from models.solicitud import solicitud
from schemas.solicitud import Solicitud, SolicitudCrear

solicitud_routes = APIRouter()

@solicitud_routes.get("/solicitudes", tags=["Gestión de solicitudes"])
def get_solicitudes():
    try:
        result = conexion.execute(solicitud.select()).fetchall()
        solicitudes_list = [Solicitud.from_orm(dict(row._mapping)) for row in result]
        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@solicitud_routes.get("/solicitudes_por_curso", tags=["Gestión de solicitudes"])
def get_solicitudes_por_curso(id_curso: int):
    try:
        
        result = conexion.execute(
            solicitud.select().where(solicitud.c.id_curso == id_curso)
        ).fetchall()

        
        solicitudes_list = [Solicitud.from_orm(dict(row._mapping)) for row in result]
        
        return solicitudes_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@solicitud_routes.post("/solicitud", tags=["Gestión de solicitudes"])
def insertar_solicitud(solicitud_data: SolicitudCrear):
    try:
        print(solicitud_data)
        curso_existente = conexion.execute(
            curso.select().where(curso.c.id == solicitud_data.id_curso)
        ).fetchone()

        if not curso_existente:
            raise HTTPException(
                status_code=400,
                detail=f"El curso con ID {solicitud_data.id_curso} no existe."
            )

        
        new_solicitud = solicitud_data.dict()
        result = conexion.execute(solicitud.insert().values(new_solicitud))
        conexion.commit()  
        return {
            "status": "Solicitud insertada",
            "solicitud_id": result.inserted_primary_key[0] if result.inserted_primary_key else None
        }

    except HTTPException as http_exc:
        raise http_exc  

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@solicitud_routes.delete("/solicitud/{id}", tags=["Gestión de solicitudes"])
def eliminar_solicitud(id: int):
    try:
        result = conexion.execute(
            solicitud.delete().where(solicitud.c.id == id)
        )
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")
        conexion.commit()
        return {"status": "Solicitud eliminada", "solicitud_id": id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@solicitud_routes.put("/solicitud/{id}", tags=["Gestión de solicitudes"])
def update_solicitud(id: int, solicitud_data: SolicitudCrear):
    try:
        update_values = solicitud_data.dict(exclude_unset=True)

        result = conexion.execute(
            solicitud.update().where(solicitud.c.id == id).values(update_values)
        )

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")

        conexion.commit()
        return {"status": "Solicitud actualizada", "solicitud_id": id}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))