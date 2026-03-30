const express = require('express')
const mongoose = require('mongoose')
const {URI} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const{unknownPath, errorHandler, requestLogger, getAuthorizedUser} = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require( './controllers/login' )

const app = express()

mongoose.connect(URI, {family : 4})


app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/login', loginRouter)

app.use(unknownPath)
app.use(errorHandler)
module.exports = app