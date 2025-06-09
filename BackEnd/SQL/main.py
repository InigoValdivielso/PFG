from fastapi import FastAPI
from routes.credencial import credencial_routes
from routes.solicitud import solicitud_routes
from routes.estudiante import estudiante_routes
from routes.secretaria import secretaria_routes
from routes.curso import curso_routes
from routes.auth import auth_routes
from routes.persona import persona_routes
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from config.db import meta, engine

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
    },{
        "name": "Gestión de cursos",
        "description": "Rutas relacionadas con la gestión de cursos"
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

app.include_router(credencial_routes)
app.include_router(solicitud_routes)
app.include_router(secretaria_routes)
app.include_router(estudiante_routes)
app.include_router(curso_routes)
app.include_router(auth_routes)
app.include_router(persona_routes)




if __name__ == "__main__":
    meta.create_all(engine)
    import uvicorn
    uvicorn.run(
        "main:app",
        host="localhost",
        port=8000,
        reload=True
    )

