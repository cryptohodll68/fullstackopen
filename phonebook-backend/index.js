const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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
let notes =
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/notes', (req, res) => {
  
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(n => n.id === id)
  if (note) {
     res.json(note)
   
  } else {
     res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const time = new Date()
  const entries = notes.length
  
  res.send(`Phonebook has info for ${entries} people <br> ${time}`)
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(404).json({error: 'You must type a name'})
  }

  if(notes.find(n => n.name === body.name)) {
    return res.status(404).json({erro: 'name arleady exist'})
  }

  const note = {
    id: String(Math.floor(Math.random() * 1000)),
    name: body.name,
    number: body.number,
  }

 notes = notes.concat(note)
 
 res.json(notes)

})
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(n => n.id !== id)
  res.json(notes)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
