import pytest
from datetime import date

estudiante_mock = {
    "nombre": "test",
    "primer_apellido": "test 2",
    "segundo_apellido": "Valdi",
    "correo": "test@ejemplo.com",
    "dni": "12345678Z",
    "fecha_nacimiento": str(date(2000, 1, 1)),
    "did": "did:ebsi:test_est",
    "cursos": [],
    "credenciales": []
}

estudiante_actualizado = {
    "nombre": "test Modificado",
    "primer_apellido": "G.",
    "segundo_apellido": "Valdi",
    "correo": "test@ejemplo.com",
    "dni": "12345678Z",
    "fecha_nacimiento": str(date(2000, 1, 1)),
    "did": "did:ebsi:test_est",
    "cursos": [],
    "credenciales": []
}
curso_mock = {
    "nombre": "Curso Test Estudiante",
    "descripcion": "Curso temporal de prueba para estudiante",
    "duracion": "20",
    "requisitos": []
}

credencial_mock = {
    "id": "cred-est-001",
    "estado": "emitida",
    "estudiante_id": None
}


nia_global = None
curso_id_global = None
credencial_id_global = credencial_mock["id"]



@pytest.mark.asyncio
async def test_crear_estudiante(test_client):
    global nia_global
    response = await test_client.post("/estudiante", json=estudiante_mock)
    assert response.status_code == 200
    data = response.json()
    nia_global = data["nia"]
    assert isinstance(nia_global, int)

@pytest.mark.asyncio
async def test_get_estudiantes(test_client):
    response = await test_client.get("/estudiante")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_estudiante_por_correo(test_client):
    response = await test_client.get(f"/estudiante/correo?correo={estudiante_mock['correo']}")
    assert response.status_code == 200
    assert response.json()["did"] == estudiante_mock["did"]

@pytest.mark.asyncio
async def test_actualizar_estudiante(test_client):
    response = await test_client.put(f"/estudiante/{nia_global}", json=estudiante_actualizado)
    assert response.status_code == 200
    assert "actualizado" in response.json()["status"].lower()

@pytest.mark.asyncio
async def test_get_credenciales_estudiante(test_client):
    response = await test_client.get(f"/estudiantes/{nia_global}/credenciales")
    assert response.status_code == 404  # no tiene credenciales aún

@pytest.mark.asyncio
async def test_borrar_estudiante(test_client):
    response = await test_client.delete(f"/estudiante/{nia_global}")
    assert response.status_code == 200
    assert "eliminado" in response.json()["message"]

@pytest.mark.asyncio
async def test_preparar_curso_y_credencial(test_client):
    global curso_id_global, credencial_id_global

    # Crear curso
    res_curso = await test_client.post("/crearCurso", json=curso_mock)
    assert res_curso.status_code == 200
    curso_id_global = res_curso.json()["curso_id"]

    # Crear credencial
    credencial_mock["estudiante_id"] = nia_global
    res_cred = await test_client.post("/credencial", json=credencial_mock)
    assert res_cred.status_code == 200
    assert res_cred.json()["credencial_id"] == credencial_id_global

@pytest.mark.asyncio
async def test_añadir_cursos_al_estudiante(test_client):
    response = await test_client.post(f"/estudiante/{nia_global}/cursos", json=[curso_id_global])
    assert response.status_code == 200
    assert "añadidos" in response.json()["status"]

@pytest.mark.asyncio
async def test_añadir_credenciales_al_estudiante(test_client):
    response = await test_client.put(f"/estudiante/{nia_global}/credenciales", json=[credencial_id_global])
    assert response.status_code == 200
    assert "Credenciales" in response.json()["status"]

@pytest.mark.asyncio
async def test_actualizar_estado_del_curso(test_client):
    response = await test_client.put(
        f"/estudiante/{nia_global}/curso/{curso_id_global}/estado?nuevo_estado=finalizado"
    )
    assert response.status_code == 200
    assert "actualizado" in response.json()["message"].lower()

@pytest.mark.asyncio
async def test_borrar_estudiante(test_client):
    response = await test_client.delete(f"/estudiante/{nia_global}")
    assert response.status_code == 200
    assert "eliminado" in response.json()["message"]
