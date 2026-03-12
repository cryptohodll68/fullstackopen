require('dotenv').config()
const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, {family : 4})

const numberValidator  = (val) => {
  return /\d{2,3}-\d{5,}/.test(val)
}

const validator = [ numberValidator, '{VALUE} is not valid correct format 12(3)-45678']
const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: validator,
  }  
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)
