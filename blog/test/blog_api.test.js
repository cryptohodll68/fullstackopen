const {test, beforeEach, after, describe}  = require('node:test')
const assert = require('node:assert')
const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog.js')

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

 const listWithOneBlog = [
    {
      
      title: 'Solo title',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const noLikeBlog = {
    
      title: 'No like',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      __v: 0
  }

  const noUrlBlog = {
  
      title: 'Solo title',
      author: 'Edsger W. Dijkstra',
      likes: 5,
      __v: 0
  }

  const noTitleBlog = {
 
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
  }

beforeEach(async () => {
  
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

describe('returning blogs correctly', async () => {
  test('return corect ammouny of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  
})
  test('returned object has ID property', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(r => {
    assert(Object.hasOwn(r, 'id'))
    assert(!Object.hasOwn(r, '_id'))
    assert(!Object.hasOwn(r, '__v'))
  })
 
})



})
describe('api calls to post blogs and use default value if missing properties', () => {
  test.only('post new blog correctly', async () => {

  const blogAtStart = await api.get('/api/blogs')
  const response = await api.post('/api/blogs')
  .send(listWithOneBlog[0])
  .expect(200)
    
  const newResponse = await api.get('/api/blogs')
  assert.deepStrictEqual(response.body, { error: 'missing token' })
  assert.strictEqual(blogAtStart.body.length, newResponse.body.length)

})

test('if no like property set to 0', async () => {
  await api.post('/api/blogs').send(noLikeBlog).expect(201)
  const lastBlog = await (await api.get('/api/blogs')).body.pop()
  assert.ok(Object.hasOwn(lastBlog, "likes"))
  assert.strictEqual(lastBlog.likes, 0)
})

test('if no url property respond with 400 bad request', async () => {
  await api.post('/api/blogs').send(noUrlBlog).expect(400)
})

test('if no title property respond with 400 bad request', async () => {
  await api.post('/api/blogs').send(noTitleBlog).expect(400)
})

})

describe('deleting blogs tests', () => {
  test('delete blog by ID', async () => {
    const id = "5a422bc61b54a676234d17fc"
    await api.delete(`/api/blogs/${id}`).expect(204)
    const getBlogs = (await api.get('/api/blogs')).body
    const exist = getBlogs.find(blog => blog.id === id)
    assert.strictEqual(exist, undefined)
  })
})


describe('update blogs likes',  () => {
  test('update likes', async () => {
    const blogToUpdate = {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 8,
  
  }  
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
    
    const updatedBlog = (await api.get('/api/blogs')).body.find(blog => blog.id === blogToUpdate.id)
    assert.deepStrictEqual(blogToUpdate, updatedBlog)
  })
})

after(async () => {
  await mongoose.connection.close()
})