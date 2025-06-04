import os
from dotenv import load_dotenv
from cryptography.fernet import Fernet


load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY")
if SECRET_KEY is None:
    raise ValueError("SECRET_KEY no está configurada en el .env")


ALGORITHM = "HS256"


fernet = Fernet(SECRET_KEY.encode())
