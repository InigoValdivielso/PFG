import pytest

persona_mock = {
    "nombre": "Jon",
    "primer_apellido": "Nieve",
    "segundo_apellido": "del Norte",
    "correo": "jon@norte.com",
    "dni": "99999999Z",
    "fecha_nacimiento": "1990-01-01"
}

curso_mock = {
    "nombre": "Curso de Espadas",
    "descripcion": "Aprender a usar la espada",
    "duracion": "30 horas"
}

credencial_mock = {
    "id": "cred-test-999",
    "estado": "emitida"
}

solicitud_id_global = None
curso_id_global = None
persona_id_global = None
credencial_id_global = None

@pytest.mark.asyncio
async def test_preparar_persona_curso_credencial(test_client):
    global persona_id_global, curso_id_global, credencial_id_global

    # Crear persona
    res_persona = await test_client.post("/persona", json=persona_mock)
    assert res_persona.status_code == 200
    persona_id_global = res_persona.json()["id"]

    # Crear curso
    res_curso = await test_client.post("/crearCurso", json=curso_mock)
    assert res_curso.status_code == 200
    curso_id_global = res_curso.json()["curso_id"]

    # Crear credencial asociada a persona
    res_cred = await test_client.post("/credencial", json={**credencial_mock, "estudiante_id": persona_id_global})
    assert res_cred.status_code == 200
    credencial_id_global = res_cred.json()["credencial_id"]

@pytest.mark.asyncio
async def test_crear_solicitud(test_client):
    global solicitud_id_global
    payload = {
        "id_persona": persona_id_global,
        "id_curso": curso_id_global,
        "credenciales": [credencial_id_global],
        "estado": "pendiente"
    }
    response = await test_client.post("/solicitud", json=payload)
    assert response.status_code == 200
    data = response.json()
    solicitud_id_global = data["solicitud_id"]
    assert data["status"] == "Solicitud insertada"

@pytest.mark.asyncio
async def test_get_solicitudes(test_client):
    response = await test_client.get("/solicitudes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_solicitudes_por_curso(test_client):
    response = await test_client.get(f"/solicitudes_por_curso?id_curso={curso_id_global}")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_modificar_solicitud(test_client):
    payload = {
        "estado": "aceptada"
    }
    response = await test_client.put(f"/solicitud/{solicitud_id_global}", json=payload)
    assert response.status_code == 200
    assert "actualizada" in response.json()["status"]

@pytest.mark.asyncio
async def test_borrar_solicitud(test_client):
    response = await test_client.delete(f"/solicitud/{solicitud_id_global}")
    assert response.status_code == 200
    assert "eliminadas" in response.json()["status"]
