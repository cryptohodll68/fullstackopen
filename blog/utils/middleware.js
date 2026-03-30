const User = require( '../models/user' )
const logger = require('./logger')
const {SECRET} = require('./config')
const jwt = require('jsonwebtoken')

const errorHandler = (error, req, res, next) => {
  logger.error('------------------------')
  logger.error('ERROR OBJECT:')
  logger.error(error)
  logger.error('NAME:', error.name)
  logger.error('MESSAGE:', error.message)
  logger.error('STACK:', error.stack)
  logger.error('------------------------')

    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError' && error.message.includes('User validation failed')) {
      return res.status(400).json('name and username must be at least 3 character length')
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'invalid token'})
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'token expired'})
    }
 
    next()
}

const unknownPath = (req, res) => {
  res.status(400).send('Uknown Path')
}

const requestLogger = (req, res, next ) => {
  logger.info("Method", req.method)
  logger.info("Path", req.path)
  logger.info("Body", req.body || {} )
  
  next()
}


const getAuthorizedUser = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return res.json({error: 'missing token'})
  }
  const token = authorization.replace('Bearer ', '')
  const decodedToken = jwt.verify(token, SECRET)
  const user = await User.findById(decodedToken.id)
  req.user = user
  
  next()
}
module.exports = { errorHandler, unknownPath, requestLogger, getAuthorizedUser}