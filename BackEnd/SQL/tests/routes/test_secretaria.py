import pytest

secretaria_mock = {
    "username": "test",
    "email": "test@correo.com",
    "password": "segura123"
}

secretaria_actualizado = {
    "username": "test_editada",
    "email": "test@correo.com",  
    "password": "nueva123"
}

secretaria_id_global = None
token_global = None

@pytest.mark.asyncio
async def test_registro_secretaria(test_client):
    global secretaria_id_global
    response = await test_client.post("/register", json=secretaria_mock)
    assert response.status_code == 200
    data = response.json()
    assert "user_id" in data
    secretaria_id_global = data["user_id"]

@pytest.mark.asyncio
async def test_login_secretaria(test_client):
    global token_global
    response = await test_client.post("/login", json={
        "username": secretaria_mock["username"],
        "password": secretaria_mock["password"]
    })

    print(">> Login status:", response.status_code)
    print(">> Login response:", response.text)

    assert response.status_code == 200, f"Falló login: {response.text}"
    data = response.json()
    assert "token" in data, "Token no encontrado en respuesta"
    token_global = data["token"]

@pytest.mark.asyncio
async def test_get_secretarias(test_client):
    response = await test_client.get("/secretaria")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_actualizar_secretaria(test_client):
    headers = {"Authorization": f"Bearer {token_global}"}
    response = await test_client.put("/secretaria", json=secretaria_actualizado, headers=headers)
    assert response.status_code == 200
    assert "updated" in response.json()["status"]

@pytest.mark.asyncio
async def test_borrar_secretaria(test_client):
    headers = {"Authorization": f"Bearer {token_global}"}
    response = await test_client.delete(f"/secretaria/{secretaria_id_global}", headers=headers)
    assert response.status_code == 200
    assert "deleted" in response.json()["status"]
