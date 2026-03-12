const logger = require('./logger')
const morgan = require('morgan')

const handleError = (error, req, res, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

const requestLogger = morgan( (tokens, req, res) => {

  return[
    tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
})

module.exports = { handleError, unknownEndpoint, requestLogger}