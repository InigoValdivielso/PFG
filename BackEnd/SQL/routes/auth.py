from fastapi import APIRouter, Depends, HTTPException, Header, Request, Security
from fastapi.security import APIKeyHeader
from requests import Session
from models.secretaria import secretaria
from schemas.secretaria import LoginRequest, Secretaria
from functions_jwt import validate_token, write_token
from fastapi.responses import JSONResponse
from config.db import get_db
from config.settings import fernet  

api_key_header = APIKeyHeader(name="Authorization", auto_error=False)
auth_routes = APIRouter()


@auth_routes.post("/login", tags=["Autentificación"])
def login(data: LoginRequest, db: Session = Depends(get_db)):
    username = data.username
    password = data.password

    result = db.execute(secretaria.select().where(secretaria.c.username == username)).fetchone()

    if result:
        stored = dict(result._mapping)
        try:
            password_encrypted = stored["password"]
            if isinstance(password_encrypted, str):
                password_encrypted = password_encrypted.encode()  

            password_real = fernet.decrypt(password_encrypted).decode()
        except Exception:
            return JSONResponse(content={"status": "error", "message": "Error al descifrar la contraseña"}, status_code=500)

        if password_real == password:
            user = Secretaria.model_validate(stored)
            token = write_token(user.model_dump())
            return JSONResponse(content={"status": "success", "token": token}, status_code=200)

    return JSONResponse(content={"status": "error", "message": "Usuario o contraseña incorrectos"}, status_code=404)


@auth_routes.post("/verify/token", tags=["Autentificación"])
def verify_token(Authorization: str = Security(api_key_header), db: Session = Depends(get_db)):
    if not Authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        token = Authorization.split(" ")[1]
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")

    user_data = validate_token(token, output=True)

    if not isinstance(user_data, dict):
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if "password" in user_data:
        try:
            password_encrypted = user_data["password"]
            if isinstance(password_encrypted, str):
                password_encrypted = password_encrypted.encode()  

            user_data["password"] = fernet.decrypt(password_encrypted).decode()
        except Exception:
            raise HTTPException(status_code=500, detail="Error decrypting password")

    return user_data
