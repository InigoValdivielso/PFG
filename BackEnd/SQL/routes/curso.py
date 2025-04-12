from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select, join
from config.db import conexion
from models.curso import curso
from models.requisitos import requisitos
from schemas.curso import Curso

curso = APIRouter()

@curso.post("/crearCurso")
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

    return {
        "message": "Curso creado correctamente",
        "curso_id": curso_id
    }

@curso.get("/cursos")
def obtener_cursos():
    query = select(curso)
    result = conexion.execute(query).fetchall()
    return result

@curso.get("/cursos/nombres")
def obtener_nombres_cursos():
    
    cursos = conexion.execute(select([curso.c.nombre])).fetchall()

    if not cursos:
        raise HTTPException(status_code=404, detail="No se encontraron cursos")

   
    return {"cursos": [curso[0] for curso in cursos]}

@curso.get("/curso/{nombre}")
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
@curso.delete("/curso/{id}")
def borrar_curso(id: int):
    
    curso_data = conexion.execute(
        select([curso]).where(curso.c.id == id)
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

@curso.put("/curso/{id}")
def modificar_curso(id: int, data: Curso):
    
    curso_data = conexion.execute(
        select([curso]).where(curso.c.id == id)
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

    return {"message": "Curso modificado correctamente"}
