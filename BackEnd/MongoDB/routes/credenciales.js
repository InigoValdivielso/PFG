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
        
        if (credenciales.length === 0) {
            return res.status(404).json({ message: 'No hay credenciales' })
        }
        res.json(credenciales)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Coger una credencial por id
router.get('/:id', async (req, res) => {
    try {
        const credencial = await Microcredencial.findById(req.params.id)
        if (!credencial) {
            return res.status(404).json({ message: 'Credencial no encontrada' })
        }
        res.json(credencial)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Crear una credencial
router.post('/', async (req, res) => {
    
    const credencial = new Microcredencial(req.body)
    try {
        const nuevaCredencial = await credencial.save()
        res.status(201).json(nuevaCredencial)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Borrar una credencial por id
router.delete('/:id', async (req, res) => {
    try {
        const credencial = await Microcredencial.findByIdAndDelete(req.params.id)
        if (!credencial) {
            return res.status(404).json({ message: 'Credencial no encontrada' })
        }
        res.json({ message: 'Credencial borrada' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})