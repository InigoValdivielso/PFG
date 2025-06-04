import pytest

secretaria_mock = {
    "username": "authuser",
    "email": "auth@correo.com",
    "password": "clave123"
}

token_global = None


@pytest.mark.asyncio
async def test_registro_secretaria_para_login(test_client):
    response = await test_client.post("/register", json=secretaria_mock)
    assert response.status_code == 200
    data = response.json()
    assert "user_id" in data


@pytest.mark.asyncio
async def test_login_generar_token(test_client):
    global token_global
    response = await test_client.post("/login", json={
        "username": secretaria_mock["username"],
        "password": secretaria_mock["password"]
    })
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    token_global = data["token"]


@pytest.mark.asyncio
async def test_verificar_token(test_client):
    global token_global
    headers = {"Authorization": f"Bearer {token_global}"}
    response = await test_client.post("/verify/token", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "email" in data
    assert data["email"] == secretaria_mock["email"]


@pytest.mark.asyncio
async def test_login_con_contraseña_incorrecta(test_client):
    response = await test_client.post("/login", json={
        "username": secretaria_mock["username"],
        "password": "incorrecta"
    })
    assert response.status_code == 404
    assert "Usuario o contraseña incorrectos" in response.text


@pytest.mark.asyncio
async def test_verificar_token_invalido(test_client):
    headers = {"Authorization": "Bearer token_falso"}
    response = await test_client.post("/verify/token", headers=headers)
    assert response.status_code == 401
    assert "Invalid or expired token" in response.text
