import pytest
from datetime import date

persona_mock = {
    "nombre": "Jonan",
    "primer_apellido": "Gitano",
    "segundo_apellido": "Valdi",
    "correo": "jonan@persona.com",
    "dni": "98765432A",
    "fecha_nacimiento": str(date(1999, 5, 15))
}

persona_actualizada = {
    "nombre": "Jonan Mod",
    "primer_apellido": "G.",
    "segundo_apellido": "Valdi",
    "correo": "jonan@persona.com",
    "dni": "98765432A",
    "fecha_nacimiento": str(date(1999, 5, 15))
}

persona_id_global = None

@pytest.mark.asyncio
async def test_crear_persona(test_client):
    global persona_id_global
    response = await test_client.post("/persona", json=persona_mock)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    persona_id_global = data["id"]

@pytest.mark.asyncio
async def test_get_personas(test_client):
    response = await test_client.get("/persona")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_persona_por_id(test_client):
    response = await test_client.get(f"/persona/{persona_id_global}")
    assert response.status_code == 200
    assert response.json()["correo"] == persona_mock["correo"]

@pytest.mark.asyncio
async def test_actualizar_persona(test_client):
    response = await test_client.put(f"/persona/{persona_id_global}", json=persona_actualizada)
    assert response.status_code == 200
    assert "actualizado" in response.json()["status"].lower()

@pytest.mark.asyncio
async def test_borrar_persona(test_client):
    response = await test_client.delete(f"/persona/{persona_id_global}")
    assert response.status_code == 200
    assert "eliminado" in response.json()["message"]

@pytest.mark.asyncio
async def test_get_persona_inexistente(test_client):
    response = await test_client.get(f"/persona/{persona_id_global}")
    assert response.status_code == 404
