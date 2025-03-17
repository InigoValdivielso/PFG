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
        'successRedirectUri': 'https://getbootstrap.com/docs/5.3/components/buttons/$id',
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(
            'https://verifier.demo.walt.id/openid4vc/verify', 
            presentationDefinition, // El cuerpo de la petición
            { headers } // Pasando los headers
        );
        res.json(response.data); // Devolver la respuesta de la verificación
    } catch (error) {
        res.status(500).json({ message: "Error al verificar", error: error.message });
    }
});


