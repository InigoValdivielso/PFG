import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.db import Base, get_db
from main import app

# Base de datos SQLite en archivo para persistencia durante el test
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Crear el engine y la sesión de testing
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override para usar la DB de test
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear las tablas una vez por sesión de test
@pytest.fixture(scope="session", autouse=True)
def setup_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

# Cliente de test asíncrono sin deprecaciones
@pytest.fixture(scope="module")
async def test_client():
    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client
