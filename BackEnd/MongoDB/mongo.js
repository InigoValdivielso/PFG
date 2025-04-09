require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
//mongodb://mongo-server:27017/credenciales poner esto cuando metas todo en docker
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

const credencialesRouter = require('./routes/credenciales')
app.use('/credenciales', credencialesRouter)


app.listen(4000, () => console.log('Server is running on port 4000'))