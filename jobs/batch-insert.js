const csv = require('csvtojson')
const path = require('path')
const mongoose = require('mongoose')
const Accountant = require('../models/agent')
const Agent = require('../models/agent')

const URL = process.env.MONGODB_URI

mongoose.connect(URL, { useNewUrlParser: true })

const csvFilePath = path.resolve('./assets/agents.csv')

csv()
  .fromFile(csvFilePath)
  .then((agents) => {
    const agentsCollection = agents
      .map((agent) => {
        const licenseId = Object.values(agent)[0].trim()
        const fullName = Object.values(agent)[1].trim()
        const city = Object.values(agent)[2].trim()

        return {
          license_id: licenseId,
          full_name: fullName,
          city: city,
        }
      })
      .filter((agent) => {
        return agent.license_id && full_name && city
      })

    Agent.insertMany(agentsCollection)
      .then(() => {
        console.log('data inserted succesfully')
      })
      .catch((err) => {
        console.log(err.message)
      })
  })
