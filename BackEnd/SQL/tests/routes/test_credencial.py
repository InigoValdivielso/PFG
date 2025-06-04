import pytest
from datetime import date

# Datos base compartidos
estudiante_mock = {
    "nombre": "Jonan",
    "primer_apellido": "Gitano",
    "segundo_apellido": "Valdi",
    "correo": "jonan@ejemplo.com",
    "dni": "12345678Z",
    "fecha_nacimiento": str(date(2000, 1, 1)),
    "did": "did:ebsi:test123",
    "cursos": [],
    "credenciales": []
}

credencial_mock = {
    "id": "cred-test-001",
    "estado": "emitida",
    "estudiante_id": None
}

# Variables globales para los tests
nia_global = None


@pytest.mark.asyncio
async def test_crear_estudiante(test_client):
    global nia_global
    response = await test_client.post("/estudiante", json=estudiante_mock)
    assert response.status_code == 200
    nia_global = response.json()["nia"]
    assert isinstance(nia_global, int)


@pytest.mark.asyncio
async def test_insertar_credencial(test_client):
    credencial_mock["estudiante_id"] = nia_global
    response = await test_client.post("/credencial", json=credencial_mock)
    assert response.status_code == 200
    assert response.json()["credencial_id"] == credencial_mock["id"]


@pytest.mark.asyncio
async def test_get_credencial_by_id(test_client):
    response = await test_client.get(f"/credenciales/id/{credencial_mock['id']}")
    assert response.status_code == 200
    assert response.json()["estado"] == credencial_mock["estado"]


@pytest.mark.asyncio
async def test_get_credenciales_por_did(test_client):
    response = await test_client.get(f"/credenciales/did/{estudiante_mock['did']}")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any(c["id"] == credencial_mock["id"] for c in data)


@pytest.mark.asyncio
async def test_listar_todas_las_credenciales(test_client):
    response = await test_client.get("/credenciales")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


@pytest.mark.asyncio
async def test_get_credencial_inexistente(test_client):
    response = await test_client.get("/credenciales/id/NO_EXISTE")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_eliminar_credencial(test_client):
    response = await test_client.delete(f"/credencial/{credencial_mock['id']}")
    assert response.status_code == 200
    assert response.json()["id"] == credencial_mock["id"]


@pytest.mark.asyncio
async def test_eliminar_credencial_inexistente(test_client):
    response = await test_client.delete(f"/credencial/{credencial_mock['id']}")
    assert response.status_code == 404
