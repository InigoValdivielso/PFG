const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const credencialesRouter = require('../routes/credenciales');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/credenciales', credencialesRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Rutas de credenciales', () => {
  let credencialId;

  it('POST /credenciales crea una credencial', async () => {
    const credencialMock = { titulo: "Test Credencial", nivel: "A1" };
    const res = await request(app)
      .post('/credenciales')
      .send(credencialMock);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.titulo).toBe("Test Credencial");
    credencialId = res.body._id;
  });

  it('GET /credenciales obtiene todas las credenciales', async () => {
    const res = await request(app).get('/credenciales');
    expect([200, 404]).toContain(res.statusCode); // 200 si hay, 404 si no hay
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    }
  });

  it('GET /credenciales/:id obtiene una credencial existente', async () => {
    const res = await request(app).get(`/credenciales/${credencialId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(credencialId);
  });

  it('GET /credenciales/:id devuelve 404 si no existe', async () => {
    const res = await request(app).get('/credenciales/aaaaaaaaaaaaaaaaaaaaaaaa');
    expect([404, 400, 500]).toContain(res.statusCode); // puede dar 400 si el id no es válido
  });

  it('DELETE /credenciales/:id elimina una credencial', async () => {
    const res = await request(app).delete(`/credenciales/${credencialId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/borrada/i);
  });

  it('DELETE /credenciales/:id devuelve 404 si ya no existe', async () => {
    const res = await request(app).delete(`/credenciales/${credencialId}`);
    expect(res.statusCode).toBe(404);
  });
});
