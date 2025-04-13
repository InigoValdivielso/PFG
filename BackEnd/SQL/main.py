from fastapi import FastAPI
from routes.credencial import credencial
from routes.solicitud import solicitud
from routes.estudiante import estudiante
from routes.secretaria import secretaria
from routes.curso import curso
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title= "FastAPI CredentiFi",
    description= "API para el proyecto CredentiFi, que controla la gestión de estudiantes y la administración de cursos, credenciales y solicitudes.",
    version= "0.1",
    openapi_tags=[{
        "name": "Gestión de estudiantes",
        "description": "Rutas relacionadas con la gestión de estudiantes"
        
    },{
        "name": "Gestión de credenciales",
        "description": "Rutas relacionadas con la gestión de credenciales"
    },
    {
        "name": "Gestión de solicitudes",
        "description": "Rutas relacionadas con la gestión de solicitudes"
    }]
)
#app.add_middleware(SessionMiddleware, seceret_key="")
# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los encabezados
)



load_dotenv()

app.include_router(credencial)
app.include_router(solicitud)
app.include_router(secretaria)
app.include_router(estudiante)
app.include_router(curso)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="localhost",
        port=8000,
        reload=True
    )

