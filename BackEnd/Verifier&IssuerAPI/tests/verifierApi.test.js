const request = require('supertest');
const express = require('express');
const verifierApi = require('../routes/verifierApi');

jest.mock('axios');
const axios = require('axios');
jest.mock('fs');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use('/', verifierApi);

describe('Verifier API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('POST / - verifica presentación correctamente', async () => {
    axios.post.mockResolvedValueOnce({ data: { verificado: true } });

    const res = await request(app)
      .post('/')
      .send({ test: "presentation" });

    expect(res.statusCode).toBe(200);
    expect(res.body.verificado).toBe(true);
  });

  it('POST / - error al verificar', async () => {
    axios.post.mockRejectedValueOnce(new Error('Fallo simulado'));
    const res = await request(app)
      .post('/')
      .send({});

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Error al verificar/);
  });

  it('POST /login - verifica login correctamente', async () => {
    fs.readFileSync.mockReturnValueOnce(JSON.stringify({ test: "definicion" }));
    axios.post.mockResolvedValueOnce({ data: { login: "ok" } });

    const res = await request(app).post('/login').send({});
    expect(res.statusCode).toBe(200);
    expect(res.body.login).toBe("ok");
  });

  it('GET /infoSesionVerificacion/:id - éxito', async () => {
    axios.get.mockResolvedValueOnce({ status: 200, data: { resultado: "ok" } });

    const res = await request(app).get('/infoSesionVerificacion/abc123');
    expect(res.statusCode).toBe(200);
    expect(res.body.resultado).toBe("ok");
  });

  it('GET /infoSesionVerificacion/:id - error', async () => {
    axios.get.mockRejectedValueOnce(new Error("Error simulado"));
    const res = await request(app).get('/infoSesionVerificacion/abc123');
    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Error al procesar la solicitud/);
  });

  it('GET /infoSesionVerificacionGuardar/:id - guarda y devuelve', async () => {
    axios.get.mockResolvedValueOnce({ data: { dato: "verificado" } });
    axios.post.mockResolvedValueOnce({ data: { saved: true } });

    const res = await request(app).get('/infoSesionVerificacionGuardar/abc123');
    expect(res.statusCode).toBe(200);
    expect(res.body.saved).toBe(true);
  });

  it('GET /infoSesionVerificacionGuardar/:id - error en post', async () => {
    axios.get.mockResolvedValueOnce({ data: { dato: "verificado" } });
    axios.post.mockRejectedValueOnce(new Error("No se pudo guardar"));
    const res = await request(app).get('/infoSesionVerificacionGuardar/abc123');
    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Error al procesar la solicitud/);
  });

  it('POST /emitirCredencial - éxito', async () => {
    axios.post.mockResolvedValueOnce({ status: 200, data: { emitido: true } });
    const res = await request(app)
      .post('/emitirCredencial')
      .send({ credential: { nombre: "Jonan" } });
    expect(res.statusCode).toBe(200);
    expect(res.body.emitido).toBe(true);
  });

  it('POST /emitirCredencial - error', async () => {
    axios.post.mockRejectedValueOnce(new Error("No se pudo emitir"));
    const res = await request(app)
      .post('/emitirCredencial')
      .send({ credential: { nombre: "Jonan" } });
    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Error al procesar la solicitud/);
  });
});
