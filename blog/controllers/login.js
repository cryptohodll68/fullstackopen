const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {SECRET} = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  
  const {username, password} = req.body

  const user = await User.findOne({username})
 
  const passCorrect = user === null 
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passCorrect)){
    return res.json('user not found or incorrect password')
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  res
    .status(200)
    .send({token,usename: user.username, name: user.name})
})

module.exports = loginRouter