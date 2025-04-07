require('dotenv').config()

const express = require('express');
const app = express()
const cors = require('cors');


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  }));

  

const newsRouter = require('./routes/verifierApi')
app.use('/verificar', newsRouter)


app.listen(3000, () => console.log('Server is running on port 3000'))

// Documentation


//Para ejecutar el servidor, ejecuta el siguiente comando en la terminal: npm run devStart