const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require( '../models/user.js' )
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const {getAuthorizedUser} = require('../utils/middleware.js')

blogsRouter.get('/', async (req, res) => {
  const response = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(response)
})

blogsRouter.get('/:id', async (req, res) => {
  const response = await Blog.findById(req.params.id)
  res.json(response)
  
})

blogsRouter.post('/', getAuthorizedUser, async (req, res) => {
 
  const user = req.user
  
  if(!user){
    return res.status(400).json({error: "user id missing or not valid"})
  }

  const blog = new Blog({
    ...req.body,
    user: user.id
  })
  
  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', getAuthorizedUser, async (req, res) => {
  
  const user = req.user
  const blogToDelete = await Blog.findById(req.params.id)
  if(!blogToDelete){
    return res.json({error: 'blog id not found'})
  }
  if(blogToDelete.user.toString() !== user.id.toString()){
    return res.status(400).json({error: 'not authorized bastard'})
  }
  await Blog.deleteOne({_id: req.params.id})
  res.status(204).end()

})

blogsRouter.put('/:id', async (req, res) => {
  const updatedData = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {new: true, runValidators: true, context: 'query'}
  )
  res.json(updatedBlog)
})



module.exports = blogsRouter