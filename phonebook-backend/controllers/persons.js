const Person = require('../models/person.js')
const personsRouter = require('express').Router()



personsRouter.get('/', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => next(error))
 
})

personsRouter.get('/:id', (req, res, next) => {

  Person.findById(req.params.id).then( person =>
    res.json(person)
  )
    .catch(error => next(error))
})

personsRouter.get('/info', (req, res, next) => {
  const time = new Date()
  Person.find({}).then(persons => {
    
    const entries = persons.length
    res.send(`Phonebook has info for ${entries} people <br> ${time}`)
  })
    .catch(error => next(error))
  
})

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
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

personsRouter.delete('/:id', (req, res, next) => {
  
  Person.findByIdAndDelete(req.params.id).then( deleted => {
    return res.json(deleted).end()
  })
    .catch(error => next(error))

})

module.exports = personsRouter