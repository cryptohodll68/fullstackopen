require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())



morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan( (tokens, req, res) => {

  return[
    tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))


app.get('/api/notes', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
  .catch(error => next(error))
 
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(req.params.id).then( person =>
    res.json(person)
  )
  .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  const time = new Date()
  Person.find({}).then(persons => {
    
    const entries = persons.length
    res.send(`Phonebook has info for ${entries} people <br> ${time}`)
  })
  .catch(error => next(error))
  
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(400).json({error: 'You must type a name'})
  }

  Person.findOne({name: body.name}).then(existing => {
    if(existing) {
       existing.number = body.number
       return existing.save().then(updated => {
       res.json(updated)
      })
    }
 


  const person = new Person ({
    name: body.name,
    number: body.number,
  })

 return person.save()
 
 })
 .then(savedperson => {
  if(savedperson) {res.json(savedperson)}})
    .catch(error => next(error))

})

app.put('/api/notes/:id', (req, res, next) => {
const { name, number} = req.body

  Person.findById(req.params.id)
    .then(person => {
      if(!person) {
        return res.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedName) => {
        res.json(updatedName)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(req.params.id).then( deleted => {
    return res.json(deleted).end()
  })
  .catch(error => next(error))

})

const handleError = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(handleError)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
