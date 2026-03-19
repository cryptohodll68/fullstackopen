const express = require('express')
const mongoose = require('mongoose')
const {URI} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const{unknownPath, errorHandler, requestLogger} = require('./utils/middleware')
const app = express()

mongoose.connect(URI, {family : 4})


app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(unknownPath)
app.use(errorHandler)
module.exports = app