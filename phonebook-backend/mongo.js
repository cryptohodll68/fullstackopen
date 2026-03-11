const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} 

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://user:${password}@noob.xi6zl6z.mongodb.net/?appName=Noob`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family : 4 })

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person ({
  name: name,
  number: number
})

if(process.argv.length === 3){
  Person.find({}).then( res => {
    res.forEach(entry => console.log(entry))
    mongoose.connection.close()
  })
 
}



person.save().then( res =>{
  console.log(`${name} with ${number} is added to database`)
  mongoose.connection.close()
})