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

app.get('/cities', (req, res) => {
  Agent.find({})
    .distinct('city')
    .then((cities) => {
      res.json(cities)
    })
})

app.get('/agents/:city_name', (req, res) => {
  Agent.find({ city: req.params.city_name }).then((agents) => {
    res.json(agents)
  })
})

app.put('/agents/:id/edit', (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  const newCity = req.body.newCity
  Agent.findOneAndUpdate({ license_id: id }, { city: newCity }).then(() => {
    res.send('aloha')
  })
})

/* ====== Port ======= */

const PORT = process.env.PORT

app.listen(PORT, () => console.log('server running on ', PORT))
