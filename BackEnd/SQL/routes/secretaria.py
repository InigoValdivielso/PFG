from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select, join
from config.db import conexion
from models.secretaria import secretaria
from schemas.secretaria import Secretaria
import os
from routes.auth import verify_token
from fastapi import HTTPException
from cryptography.fernet import Fernet
from dotenv import load_dotenv
load_dotenv()

key = os.environ.get("SECRET_KEY")

if key is None:
   raise ValueError("SECRET_KEY no está configurada correctamente.")
f = Fernet(key.encode())

secretaria = APIRouter()

@secretaria.get("/secretaria", tags=["Gestión de usuarios"])
def get_users():
    try:
        result = conexion.execute(secretaria.select()).fetchall()

        # Convert each row into a UserResponse Pydantic model
        users_list = [Secretaria.from_orm(dict(row._mapping)) for row in result]
        
        return users_list
    except Exception as e:
        return {"status": "error", "message": str(e)}



@secretaria.post("/register", tags=["Gestión de usuarios"])
def create_user(user: Secretaria):
    new_user = {"username": user.username, "email": user.email}
    new_user["password"] = f.encrypt(user.password.encode("utf-8"))
    try:
        result = conexion.execute(secretaria.insert().values(new_user))
        conexion.commit()  

        return {"status": "user created", "user_id": result.inserted_primary_key[0] if result.inserted_primary_key else None}
    
    except Exception as e:
        return {"status": "error", "message": str(e)}


@secretaria.delete("/secretaria", tags=["Gestión de usuarios"])
def delete_user(user: Secretaria, token_data: dict = Depends(verify_token)):
    try:
        email = token_data["email"]
        result = conexion.execute(secretaria.delete().where(secretaria.c.email == email))
        if result is None:
            raise HTTPException(status_code=404, detail="User not found")
        conexion.commit()  
        return {"status": "User deleted successfully", "user_email": user.email}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@secretaria.put("/secretaria", tags=["Gestión de usuarios"])
def update_user(user: Secretaria, token_data: dict = Depends(verify_token)):
    try:
        email = token_data["email"]
        existing_user = conexion.execute(secretaria.select().where(secretaria.c.email == email)).fetchone()
        if existing_user is None:
            raise HTTPException(status_code=404, detail="User not found")
    
        conexion.execute(secretaria.update().where(secretaria.c.email == email).values(username=user.username, email=user.email, password=f.encrypt(user.password.encode("utf-8"))))
        conexion.commit()  
        return {"status": "User updated successfully", "user_email": user.email}
    except Exception as e: 
        return {"status": "error", "message": str(e)}

