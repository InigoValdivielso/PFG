import pytest
from httpx import AsyncClient
from main import app

@pytest.fixture(scope="module")
async def test_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac