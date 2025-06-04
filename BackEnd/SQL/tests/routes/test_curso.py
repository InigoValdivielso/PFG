import pytest

curso_mock = {
    "nombre": "Curso Test",
    "descripcion": "Curso completo para dominar la Gitanez profesional.",
    "duracion": "30 horas",
    "requisitos": []
}

curso_modificado = {
    "nombre": "Curso Test Modificado",
    "descripcion": "Curso modificado con nivel superior.",
    "duracion": "45 horas",
    "requisitos": []
}

curso_id_global = None

@pytest.mark.asyncio
async def test_crear_curso(test_client):
    global curso_id_global
    response = await test_client.post("/crearCurso", json=curso_mock)
    assert response.status_code == 200
    curso_id_global = response.json()["curso_id"]
    assert isinstance(curso_id_global, int)

@pytest.mark.asyncio
async def test_get_curso_por_id(test_client):
    response = await test_client.get(f"/curso/{curso_id_global}")
    assert response.status_code == 200
    data = response.json()
    assert data["nombre"] == curso_mock["nombre"]

@pytest.mark.asyncio
async def test_get_curso_por_nombre(test_client):
    response = await test_client.get(f"/curso/nombre/{curso_mock['nombre']}")
    assert response.status_code == 200
    data = response.json()
    assert data["descripcion"] == curso_mock["descripcion"]

@pytest.mark.asyncio
async def test_get_cursos_paginados(test_client):
    response = await test_client.get("/cursos?page=1&limit=10")
    assert response.status_code == 200
    data = response.json()
    assert "cursos" in data
    assert isinstance(data["cursos"], list)

@pytest.mark.asyncio
async def test_get_nombres_cursos(test_client):
    response = await test_client.get("/cursos/nombres")
    assert response.status_code == 200
    data = response.json()
    assert "cursos" in data
    assert curso_mock["nombre"] in data["cursos"]

@pytest.mark.asyncio
async def test_modificar_curso(test_client):
    response = await test_client.put(f"/curso/{curso_id_global}", json=curso_modificado)
    assert response.status_code == 200
    get_response = await test_client.get(f"/curso/{curso_id_global}")
    assert get_response.status_code == 200
    assert get_response.json()["nombre"] == curso_modificado["nombre"]

@pytest.mark.asyncio
async def test_borrar_curso(test_client):
    response = await test_client.delete(f"/curso/{curso_id_global}")
    assert response.status_code == 200
    assert "eliminado" in response.json()["message"]

@pytest.mark.asyncio
async def test_get_curso_inexistente(test_client):
    response = await test_client.get("/curso/99999")
    assert response.status_code == 404

@pytest.mark.asyncio
async def test_borrar_curso_inexistente(test_client):
    response = await test_client.delete("/curso/99999")
    assert response.status_code == 404
