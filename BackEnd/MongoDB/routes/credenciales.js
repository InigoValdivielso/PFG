const express = require('express')
const router = express.Router()
const Microcredencial = require('../schema/credencial')
const mongoose = require('mongoose')


const axios = require("axios")

module.exports = router

//Coger todas las credenciales de la base de datos
router.get('/', async (req, res) => { 
    try {
        const credenciales = await Microcredencial.find()
        res.json(credenciales)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

