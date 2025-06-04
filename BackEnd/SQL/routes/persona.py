from typing import List
from fastapi import APIRouter, HTTPException, Depends
from requests import Session
from sqlalchemy import select
from config.db import get_db
from models.persona import persona
from schemas.persona import PersonaCrear, Persona



persona_routes = APIRouter()

@persona_routes.get("/persona", tags=["Gestión de personas"])
def get_personas(db: Session = Depends(get_db)):
    try:
        result = db.execute(persona.select()).fetchall()
        personas_list = [Persona.model_validate(dict(row._mapping)) for row in result]
        return personas_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@persona_routes.get("/persona/{id}", tags=["Gestión de personas"])
def get_persona(id: int, db: Session = Depends(get_db)):
    try:
        persona_data = db.execute(
            select(persona).where(persona.c.id == id)
        ).fetchone()

        if not persona_data:
            raise HTTPException(status_code=404, detail="Persona no encontrada")

        return Persona.model_validate(dict(persona_data._mapping))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@persona_routes.post("/persona", tags=["Gestión de personas"])
def create_persona(persona_data: PersonaCrear, db: Session = Depends(get_db)):
    existing = db.query(persona).filter(persona.c.correo == persona_data.correo).first()
    if existing:
        return {"mensaje": "Ya existe una persona con ese email.", "id": existing.id}

    try:
        datos = persona_data.model_dump()
        result = db.execute(persona.insert().values(datos))
        nuevo_id = result.inserted_primary_key[0]
        db.commit()

        return {"mensaje": "Persona creada correctamente", "id": nuevo_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

    


@persona_routes.delete("/persona/{id}", tags=["Gestión de personas"])
def borrar_persona(id: int, db: Session = Depends(get_db)):
    persona_data = db.execute(
        select(persona).where(persona.c.id == id)
    ).fetchone()

    if not persona_data:
        raise HTTPException(status_code=404, detail="persona no encontrado")

    # Si tienes relaciones, borra de las tablas intermedias si es necesario

    db.execute(
        persona.delete().where(persona.c.id == id)
    )
    db.commit()
    
    return {"message": f"Persona con id {id} eliminado correctamente"}

@persona_routes.put("/persona/{id}", tags=["Gestión de personas"])
def actualizar_persona(id: int, persona_actu: PersonaCrear, db: Session = Depends(get_db)):
    try:
        valores_actualizar = {
            "nombre": persona_actu.nombre,
            "primer_apellido": persona_actu.primer_apellido,
            "segundo_apellido": persona_actu.segundo_apellido,
            "correo": persona_actu.correo,
            "dni": persona_actu.dni,
            "fecha_nacimiento": persona_actu.fecha_nacimiento 
        }

        db.execute(
            persona.update().where(persona.c.id == id).values(valores_actualizar)
        )
        db.commit()
        return {"status": "Persona actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
