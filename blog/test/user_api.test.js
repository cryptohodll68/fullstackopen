const {test, beforeEach, describe, after} = require('node:test')
const assert = require('node:assert')
const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user.js')
const Blog = require('../models/blog')


const api = supertest(app)

  const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "69c408f80e3e0b42c35356ac", 
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user:"69c408f80e3e0b42c35356ad", 
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user:"69c408f80e3e0b42c35356ad", 
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user:"69c408f80e3e0b42c35356ae", 
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user:"69c408f80e3e0b42c35356ae", 
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user:"69c408f80e3e0b42c35356ae", 
    __v: 0
  }  
]

const users = [

  {
  "_id": "69c408f80e3e0b42c35356ac",
  "username": "admin",
  "name": "Michael Chan",
  "blogs": ["5a422a851b54a676234d17f7"],
  "password": "superuser"
},

  {
  "_id": "69c408f80e3e0b42c35356ad", 
  "username": "Spino",
  "name": "Edsger W. Dijkstra",
  "blogs": ["5a422aa71b54a676234d17f8","5a422b3a1b54a676234d17f9"],
  "password": "71029lolo"
},

  {
  "_id": "69c408f80e3e0b42c35356ae",  
  "username": "trotto",
  "name": "Robert C. Martin",
  "blogs": ["5a422b891b54a676234d17fa","5a422ba71b54a676234d17fb","5a422bc61b54a676234d17fc"],
  "password": "73894hf"
}

]
beforeEach(async () => {

  await User.deleteMany({})
  await Blog.deleteMany({})
  for(let user of users) {
      user.blogs = user.blogs.map(id =>new mongoose.Types.ObjectId(id))
      console.log(user)
      const insert = new User(user)
      await insert.save()
  }


  await Blog.insertMany(blogs.map(blog =>({
    ...blog,
    _id : new mongoose.Types.ObjectId(blog._id),
    user : new mongoose.Types.ObjectId(blog.user)

  })


))

})

test('retrieve all users', async () => {
  const usersAtStart = (await api.get('/api/users')).body
  const blogsTotal = (await api.get('/api/blogs')).body
 
  assert.strictEqual(usersAtStart.length, 3)

})



after( async () => {
  await mongoose.connection.close()
})