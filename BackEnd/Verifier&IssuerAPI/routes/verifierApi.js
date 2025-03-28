const express = require('express')
const router = express.Router()

const axios = require("axios")
const fs = require("fs");
const path = require("path");

module.exports = router


router.post('/', async (req, res) => {
    const presentationDefinition = JSON.parse(fs.readFileSync(path.join(__dirname, "../presentationDefinition/EducationalID.json"), "utf8"));

    // Headers que necesitas enviar
    const headers = {
        'Accept': '*/*',
        'authorizeBaseUrl': 'openid4vp://authorize',
        'responseMode': 'direct_post',
        'successRedirectUri': 'http://localhost:5173/success/$id',
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
        // Responde con los datos que recibes
        res.json(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al hacer la petición', error);
        res.status(500).send('Error al realizar la solicitud');
      }
    });
