const request = require('supertest');
const express = require('express');
const issuerApi = require('../routes/issuerApi');

jest.mock('axios');
const axios = require('axios');
const fs = require('fs').promises;

const app = express();
app.use(express.json());
app.use('/', issuerApi);

describe('Issuer API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('POST / - emite credencial con curso válido', async () => {
    // Mock lectura de plantilla
    jest.spyOn(fs, 'readFile').mockResolvedValueOnce(
      JSON.stringify({ "@context": ["test"], name: "{{nombre}}" })
    );
    // Mock axios.post
    axios.post.mockResolvedValueOnce({ data: { success: true, nombre: "Jonan" } });

    const res = await request(app)
      .post('/')
      .send({
        courseName: "Aprendizaje automático supervisado: Regresión y clasificación",
        studentInfo: { nombre: "Jonan" }
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.nombre).toBe("Jonan");
  });

  it('POST / - curso no soportado', async () => {
    const res = await request(app)
      .post('/')
      .send({
        courseName: "No existe",
        studentInfo: { nombre: "Jonan" }
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Curso no soportado/);
  });

  it('POST / - error leyendo plantilla', async () => {
    jest.spyOn(fs, 'readFile').mockRejectedValueOnce(new Error('Error simulado'));
    const res = await request(app)
      .post('/')
      .send({
        courseName: "Aprendizaje automático supervisado: Regresión y clasificación",
        studentInfo: { nombre: "Jonan" }
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Error al leer la plantilla/);
  });
});
