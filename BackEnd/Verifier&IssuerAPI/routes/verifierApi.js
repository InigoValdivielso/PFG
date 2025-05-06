const express = require('express')
const router = express.Router()

const axios = require("axios")
const fs = require("fs");
const path = require("path");

router.post('/', async (req, res) => {
  const presentationDefinition = JSON.parse(fs.readFileSync(path.join(__dirname, "../presentationDefinition/EducationalID.json"), "utf8"));

  // Headers que necesitas enviar
  const headers = {
    'Accept': '*/*',
    'authorizeBaseUrl': 'openid4vp://authorize',
    'responseMode': 'direct_post',
    'successRedirectUri': 'http://localhost:5173/prerequisites?verified=true&id=$id',
    'Content-Type': 'application/json'
  };
  //https://verifier.demo.walt.id/openid4vc/verify
  try {
    const response = await axios.post(
      'http://localhost:7003/openid4vc/verify',
      presentationDefinition, // El cuerpo de la petición
      { headers } // Pasando los headers
    );
    res.json(response.data); // Devolver la respuesta de la verificación
  } catch (error) {
    res.status(500).json({ message: "Error al verificar", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const presentationDefinition = JSON.parse(fs.readFileSync(path.join(__dirname, "../presentationDefinition/EducationalID.json"), "utf8"));

  // Headers que necesitas enviar
  const headers = {
    'Accept': '*/*',
    'authorizeBaseUrl': 'openid4vp://authorize',
    'responseMode': 'direct_post',
    'successRedirectUri': 'http://localhost:5173/studentPortal',
    'Content-Type': 'application/json'
  };
  //https://verifier.demo.walt.id/openid4vc/verify
  try {
    const response = await axios.post(
      'http://localhost:7003/openid4vc/verify',
      presentationDefinition, // El cuerpo de la petición
      { headers } // Pasando los headers
    );
    res.json(response.data); // Devolver la respuesta de la verificación
  } catch (error) {
    res.status(500).json({ message: "Error al verificar", error: error.message });
  }
});

router.get('/infoSesionVerificacion/:id', async (req, res) => {
  //https://verifier.demo.walt.id/openid4vc/session/${id}
  try {
    const { id } = req.params;
    const response = await axios.get(`http://localhost:7003/openid4vc/session/${id}`, {
      headers: {
        'accept': 'application/json',
      },
    });

    const resultadoVerificacion = response.data;
    
    
    const respuestaGuardar = await axios.post('http://localhost:4000/credenciales', resultadoVerificacion, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(respuestaGuardar.data);
    return res.status(200).json(respuestaGuardar.data); 

  } catch (error) {
    console.error('Error al hacer la petición o guardar el resultado de la verificación', error.message);
    res.status(500).send('Error al procesar la solicitud');
  }
});

module.exports = router