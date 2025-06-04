from jwt import encode, decode, exceptions
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
from config.settings import SECRET_KEY, ALGORITHM  

def expire_time(days: int):
    return datetime.now() + timedelta(days)

def write_token(data: dict):
    token = encode(
        payload={**data, "exp": expire_time(2)},
        key=SECRET_KEY,
        algorithm=ALGORITHM
    )
    return token

def validate_token(token: str, output: bool = False):
    try:
        decoded_token = decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token if output else decoded_token["email"]
    except exceptions.DecodeError:
        return JSONResponse(content={"status": "error", "message": "Token inválido"}, status_code=401)
    except exceptions.ExpiredSignatureError:
        return JSONResponse(content={"status": "error", "message": "Token expirado"}, status_code=401)
