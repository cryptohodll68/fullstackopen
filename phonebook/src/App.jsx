import { useState, useEffect } from 'react'
import personService from './services/persons'

const SearchFilter = ({value, onChange}) => {
    return(
      <>
      <h2>Filter by name</h2>
      <input value = {value} onChange={onChange}/>
      </>
    )

  }

  const Phonebook = (props) => {
      return (
        <>
        <h2>Phonebook</h2>
        
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value = {props.nameProps.value} onChange={props.nameProps.onChange} />
          number: <input value = {props.valueNumber} onChange={props.onChangeNumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
      )
    }

    const Numbers = ({filteredName, handleDelete}) => {
      return (
      <>
      <h2>Numbers</h2>
      <ul>
        {filteredName.map( person => {
        return(
        <li key={person.id}>{person.name}:  {person.number} <button onClick={() => handleDelete(person.id, person.name)}> Delete</button></li>  
        
          )}
        )}
      </ul>
      </>
      )
    }

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  console.log(persons)
  useEffect(() => {
    personService.getAll()
      .then(response => setPersons(response))
  },
    []    
  )

  const handleNewName = (event) => {
    const name = event.target.value
    setNewName(name)
  }

   const handleNewNumber = (event) => {
    const number = event.target.value
    setNewNumber(number)
  }
  
  const handleFilter = (event) => {
    const filter = event.target.value
    
    setFilter(filter)
  }
 
  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson){
      
      const confirm = window.confirm(
        `${newName} already exist. Update number?`
      )
      if(!confirm) return
       
      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }
     
      personService.update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(prev => prev.map(person => person.id === existingPerson.id ? response : person))

        })
    
        return
    }

   
      const objName = {
         name: newName,
         number: newNumber,
        
    }
    
    personService.create(objName)
      .then(response => setPersons(persons.concat(response)))
    
    
   
  }

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}`)

    if(confirmed) {
      personService.remove(id)
        .then(response => setPersons(persons.filter(person => person.id !== response.id)))
        }
  }
    
   const filteredName = filter.trim()
        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons


  

  return (
    <div>
      <SearchFilter value = {filter} onChange = {handleFilter}></SearchFilter>
      <Phonebook onSubmit={addName} nameProps={{value: newName, onChange: handleNewName}} valueNumber={newNumber} onChangeNumber={handleNewNumber}></Phonebook>
      <Numbers filteredName={filteredName} handleDelete={handleDelete}></Numbers>
      
    </div>
  )
}

export default App



 /*const duplicateChecker = )
     else {}*/