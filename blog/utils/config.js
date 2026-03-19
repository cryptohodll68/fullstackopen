require('dotenv').config()

const SECRET = process.env.SECRET
const URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_URI
  : process.env.URI
  
const PORT = process.env.PORT

module.exports = {URI, PORT, SECRET}