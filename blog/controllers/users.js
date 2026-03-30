const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')


 userRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    if(password.length < 3){
      return res.status(400).json("Password must be at least 3 characters")
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    await user.save()

    res.status(201).json(user)
 })

 userRouter.get('/', async (req, res) => {
  const all = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  res.json(all)
 })

 userRouter.delete('/', async (req, res) => {
  await User.deleteMany({})
 })

 module.exports = userRouter