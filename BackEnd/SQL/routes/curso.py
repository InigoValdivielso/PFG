from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import select, join
from config.db import conexion
from models.curso import curso
from models.requisitos import requisitos
from schemas.curso import Curso

curso_routes = APIRouter()

@curso_routes.post("/crearCurso", tags=["Gestión de cursos"])
def crear_curso(data: Curso):
    
    result = conexion.execute(curso.insert().values(
        nombre=data.nombre,
        descripcion=data.descripcion,
        duracion=data.duracion
    ))
    
    
    curso_id = result.lastrowid

    
    if data.requisitos:
        for req_id in data.requisitos:
            
            if req_id == curso_id:
                raise HTTPException(status_code=400, detail="Un curso no puede ser requisito de sí mismo.")
            conexion.execute(requisitos.insert().values(
                curso_id=curso_id,
                requisito_id=req_id
            ))
    conexion.commit()
    return {
        "message": "Curso creado correctamente",
        "curso_id": curso_id
    }

#@curso_routes.get("/cursos", tags=["Gestión de cursos"])
#def obtener_cursos():
   # query = select(curso)
  #  result = conexion.execute(query).fetchall()
 #   cursos = [dict(row._mapping) for row in result]  
#    return cursos


@curso_routes.get("/cursos", tags=["Gestión de cursos"])
def obtener_cursos_limite(page: int = Query(1, gt=0), limit: int = Query(10, gt=0)):
    offset = (page - 1) * limit
    query = select(curso).offset(offset).limit(limit)
    result = conexion.execute(query).fetchall()
    cursos = [dict(row._mapping) for row in result]
    return {
        "page": page,
        "limit": limit,
        "cursos": cursos
    }

@curso_routes.get("/cursos/nombres", tags=["Gestión de cursos"])
def obtener_nombres_cursos():
    
    cursos = conexion.execute(select(curso.c.nombre)).fetchall()

    if not cursos:
        raise HTTPException(status_code=404, detail="No se encontraron cursos")

   
    return {"cursos": [curso[0] for curso in cursos]}

@curso_routes.get("/curso/{nombre}", tags=["Gestión de cursos"])
def obtener_curso_por_nombre(nombre: str):
   
    curso_data = conexion.execute(
        select([curso]).where(curso.c.nombre == nombre)
    ).fetchone()

    if not curso_data:
        raise HTTPException(status_code=404, detail="Curso no encontrado")

    
    j = join(requisitos, curso, requisitos.c.requisito_id == curso.c.id)
    reqs = conexion.execute(
        select([curso]).select_from(j).where(requisitos.c.curso_id == curso_data.id)
    ).fetchall()

    requisitos_nombres = [{"id": r.id, "nombre": r.nombre} for r in reqs]

    return {
        "id": curso_data.id,
        "nombre": curso_data.nombre,
        "descripcion": curso_data.descripcion,
        "duracion": curso_data.duracion,
        "requisitos": requisitos_nombres
    }
@curso_routes.delete("/curso/{id}", tags=["Gestión de cursos"])
def borrar_curso(id: int):
    
    curso_data = conexion.execute(
        select(curso).where(curso.c.id == id)
    ).fetchone()

    if not curso_data:
        raise HTTPException(status_code=404, detail="Curso no encontrado")

    
    conexion.execute(
        requisitos.delete().where(requisitos.c.curso_id == id)
    )

   
    conexion.execute(
        curso.delete().where(curso.c.id == id)
    )

    return {"message": "Curso eliminado correctamente"}

@curso_routes.put("/curso/{id}", tags=["Gestión de cursos"])
def modificar_curso(id: int, data: Curso):
    
    curso_data = conexion.execute(
        select(curso).where(curso.c.id == id)
    ).fetchone()

    if not curso_data:
        raise HTTPException(status_code=404, detail="Curso no encontrado")

    
    conexion.execute(
        curso.update().where(curso.c.id == id).values(
            nombre=data.nombre,
            descripcion=data.descripcion,
            duracion=data.duracion
        )
    )

    
    conexion.execute(
        requisitos.delete().where(requisitos.c.curso_id == id)
    )

    
    if data.requisitos:
        for req_id in data.requisitos:
            if req_id == id:
                raise HTTPException(status_code=400, detail="Un curso no puede ser requisito de sí mismo.")
            conexion.execute(
                requisitos.insert().values(curso_id=id, requisito_id=req_id)
            )
    
    conexion.commit()

    return {"message": "Curso modificado correctamente"}
