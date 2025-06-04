from fastapi import APIRouter, HTTPException, Depends
from requests import Session
from sqlalchemy import select
from config.db import get_db
from models.secretaria import secretaria
from schemas.secretaria import Secretaria
from routes.auth import verify_token
from config.settings import fernet  # 🔐 Fernet importado limpio

secretaria_routes = APIRouter()

@secretaria_routes.get("/secretaria", tags=["Gestión de usuarios"])
def get_users(db: Session = Depends(get_db)):
    try:
        result = db.execute(secretaria.select()).fetchall()
        users_list = [Secretaria.model_validate(row._mapping) for row in result]
        return users_list
    except Exception as e:
        return {"status": "error", "message": str(e)}

@secretaria_routes.post("/register", tags=["Gestión de usuarios"])
def create_user(user: Secretaria, db: Session = Depends(get_db)):
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": fernet.encrypt(user.password.encode("utf-8"))
    }
    try:
        result = db.execute(secretaria.insert().values(new_user))
        db.commit()
        return {"status": "user created", "user_id": result.inserted_primary_key[0] if result.inserted_primary_key else None}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@secretaria_routes.delete("/secretaria/{id}", tags=["Gestión de usuarios"])
def delete_user(id: int, token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    try:
        result = db.execute(secretaria.delete().where(secretaria.c.id == id))
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        db.commit()
        return {"status": "User deleted successfully", "user_id": id}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@secretaria_routes.put("/secretaria", tags=["Gestión de usuarios"])
def update_user(user: Secretaria, token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    try:
        email = token_data["email"]
        existing_user = db.execute(secretaria.select().where(secretaria.c.email == email)).fetchone()
        if existing_user is None:
            raise HTTPException(status_code=404, detail="User not found")

        db.execute(
            secretaria.update()
            .where(secretaria.c.email == email)
            .values(
                username=user.username,
                email=user.email,
                password=fernet.encrypt(user.password.encode("utf-8"))
            )
        )
        db.commit()
        return {"status": "User updated successfully", "user_email": user.email}
    except Exception as e:
        return {"status": "error", "message": str(e)}
