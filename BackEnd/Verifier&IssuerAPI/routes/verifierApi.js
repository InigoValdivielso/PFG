const express = require('express')
const router = express.Router()

const axios = require("axios")
const fs = require("fs");
const path = require("path");

module.exports = router

router.post('/', async (req, res) => {
    const presentationDefinition = JSON.parse(fs.readFileSync(path.join(__dirname, "../presentationDefinition/EducationalID.json"), "utf8"));
    try {
        const response = await axios.post('https://verifier.demo.walt.id/openid4vc/verify', presentationDefinition)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({  message: "Error al verificar", error: error.message })
    }
} )

