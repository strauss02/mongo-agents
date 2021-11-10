require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const Agent = require('./models/agent.js')

const URL = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

console.log('Connecting to MondoDB...')

mongoose.connect(URL, { useNewUrlParser: true }) //Check reason

console.log('Connection to MondoDB successful!')

app.get('/', (req, res) => {
  res.json('allah')
})

app.get('/cities', (req, res) => {
  console.log('yay')
  res.send('yay')
})

/* ====== Port ======= */

const PORT = process.env.PORT

app.listen(PORT, () => console.log('server running on ', PORT))
