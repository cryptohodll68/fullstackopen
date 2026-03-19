const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')


blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(response => {
    res.json(response)
  })
  .catch(error => next(error))
})

blogsRouter.get('/:id', (req,res) => {
  Blog.findById(req.params.id).then(response => {
    res.json(response)
  })
  .catch(error => next(error))
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(response => {
    res.status(201).json(response)
  })
  .catch(error => next(error))
})



module.exports = blogsRouter