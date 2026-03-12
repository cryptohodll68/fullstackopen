const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger')
const personsRouter = require('./controllers/persons.js')
const {handleError, unknownEndpoint, requestLogger} = require('./utils/middleware.js')


const app = express()

mongoose
  .connect(config.MONGODB_URI, {family: 4})
  .then(() => {
    logger.info('connecting to', config.MONGODB_URI)
  })
  .catch((error) => {
    logger.error('error connecting to', config.MONGODB_URI, error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', personsRouter)

app.use(unknownEndpoint)
app.use(handleError)

module.exports = app