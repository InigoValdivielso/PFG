import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from config.db import get_db 
from main import app
from sqlalchemy.orm import Session
from routes.credencial import eliminar_credencial

client = TestClient(app)

@pytest.fixture(scope="module")
def mock_db():
    mock = MagicMock(spec=Session)
    yield mock

@pytest.fixture(scope="module", autouse=True)
def override_db(mock_db):
    print("¡Override_db está activo!")
    with patch("config.db.get_db", return_value=mock_db):
        yield

def test_eliminar_credencial_mock_interaction(mock_db, override_db):
    cred_id = "test-cred"
    response = client.delete(f"/credencial/{cred_id}")
    print(f"Número de llamadas a mock_db.execute: {mock_db.execute.call_count}")
    assert mock_db.execute.call_count > 0

# Helper para insertar un estudiante (ahora usa mock_db)
def insert_estudiante(mock_db, nia=1, nombre="Test", primer_apellido="User", did="did:example:abc123"):
    mock_db.execute.return_value.scalar_one.return_value = nia
    return nia, did

# Helper para insertar una credencial (ahora usa mock_db)
def insert_credencial(mock_db, id="cred-1", estado="en propiedad", estudiante_id=1):
    return id

# Helper para insertar una solicitud (ahora usa mock_db)
def insert_solicitud_base(mock_db, id=1, id_curso=1, id_persona=1, estado="pendiente"):
    return id

# Helper para insertar solicitud_doc (ahora usa mock_db)
def insert_solicitud_doc(mock_db, id_solicitud=1, id_credencial="cred-1"):
    return id_solicitud

def test_get_credenciales_empty(mock_db):
    response = client.get("/credenciales")
    assert response.status_code == 200
    assert response.json() == []
    mock_db.execute.assert_called_once()

def test_insertar_credencial(mock_db):
    nia, did = insert_estudiante(mock_db)
    cred_data = {
        "id": "cred-1",
        "estado": "activo",
        "estudiante_id": nia
    }
    response = client.post("/credencial", json=cred_data)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Credencial insertada"
    assert data["credencial_id"] is not None
    mock_db.execute.assert_called()
    mock_db.commit.assert_called_once()

def test_get_credenciales_with_data(mock_db):
    nia, did = insert_estudiante(mock_db)
    cred_id = insert_credencial(mock_db, estudiante_id=nia)
    mock_db.execute.return_value.fetchall.return_value = [MagicMock(_mapping={"id": cred_id, "estudiante_id": nia})]

    response = client.get("/credenciales")
    assert response.status_code == 200
    result = response.json()
    assert any(c["id"] == cred_id and c["estudiante_id"] == nia for c in result)
    mock_db.execute.assert_called_once()

def test_get_credencial_by_id_found(mock_db):
    nia, did = insert_estudiante(mock_db)
    cred_id = insert_credencial(mock_db, id="cred-2", estudiante_id=nia)
    mock_db.execute.return_value.fetchone.return_value = MagicMock(_mapping={"id": cred_id, "estudiante_id": nia})

    response = client.get(f"/credenciales/{cred_id}")
    assert response.status_code == 200
    cred = response.json()
    assert cred["id"] == cred_id
    assert cred["estudiante_id"] == nia
    mock_db.execute.assert_called_once()

def test_get_credencial_by_id_not_found(mock_db):
    mock_db.execute.return_value.fetchone.return_value = None
    response = client.get("/credenciales/no-existe")
    assert response.status_code == 404
    assert "no encontrada" in response.json()["detail"]
    mock_db.execute.assert_called_once()

def test_get_credenciales_por_did_found(mock_db):
    nia, did = insert_estudiante(mock_db, did="did:example:test")
    cred_id = insert_credencial(mock_db, estudiante_id=nia)
    mock_db.execute.return_value.fetchone.return_value = MagicMock(_mapping={"NIA": nia})
    mock_db.execute.return_value.fetchall.return_value = [MagicMock(_mapping={"id": cred_id, "estudiante_id": nia})]

    response = client.get(f"/credenciales/did:example:test")
    assert response.status_code == 200
    creds = response.json()
    assert any(c["id"] == cred_id and c["estudiante_id"] == nia for c in creds)
    assert mock_db.execute.call_count >= 2

def test_get_credenciales_por_did_not_found(mock_db):
    mock_db.execute.return_value.fetchone.return_value = None
    response = client.get("/credenciales/did-no-existe")
    assert response.status_code == 404
    assert "Estudiante no encontrado" in response.json()["detail"]
    mock_db.execute.assert_called_once()

def test_eliminar_credencial_direct_call(mock_db):
    cred_id = "test-cred"
    estudiante_nia_mock = 123
    estudiante_credenciales_mock = ['otro-cred']

    # Mock la consulta de la credencial
    mock_credencial = MagicMock()
    mock_credencial.__getitem__.side_effect = lambda key: {0: 'mock_id', 1: 'mock_estado', 2: estudiante_nia_mock}.get(key)
    mock_credencial.id = cred_id
    mock_credencial.estudiante_id = estudiante_nia_mock
    mock_db.execute.return_value.fetchone.side_effect = [mock_credencial, MagicMock(_mapping={'NIA': estudiante_nia_mock, 'credenciales': estudiante_credenciales_mock})]

    # Mock la eliminación de solicitudes asociadas
    mock_db.execute.return_value.rowcount = 1

    # Mock la actualización del estudiante
    mock_db.execute.return_value = MagicMock(rowcount=1)

    # Llama directamente a la función de la ruta
    result = eliminar_credencial(id=cred_id, db=mock_db)

    print(f"Resultado de la llamada directa: {result}")
    print(f"Número de llamadas a mock_db.execute: {mock_db.execute.call_count}")

    assert "Credencial y solicitudes asociadas eliminadas" in result["status"]
    assert result["id"] == cred_id
    assert result["estudiante_nia"] == estudiante_nia_mock
    assert mock_db.execute.call_count >= 3
    mock_db.commit.assert_called_once()



def test_eliminar_credencial_no_existente(mock_db):
    mock_db.execute.return_value.fetchone.return_value = None
    response = client.delete("/credencial/no-existe")
    assert response.status_code == 404
    assert "no encontrada" in response.json()["detail"]
    mock_db.execute.assert_called_once()