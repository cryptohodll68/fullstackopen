import { useState } from 'react'

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
          name: <input value = {props.valueName} onChange={props.onChangeName} />
          number: <input value = {props.valueNumber} onChange={props.onChangeNumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
      )
    }

    const Numbers = ({filteredName}) => {
      return (
      <>
      <h2>Numbers</h2>
      <ul>
        {filteredName.map( person => <li key={person.id}>{person.name}:  {person.number}</li>)}
      </ul>
      </>
      )
    }

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 



  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  

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
    console.log('names', filteredName);
    setFilter(filter)
  }
 
  const addName = (event) => {
    event.preventDefault()

    const duplicateChecker = persons.some(person => person.name === newName)
    if(duplicateChecker){
     alert(`${newName} already exist, type a new name`)
    } else {
      const objName = {
         name: newName,
         number: newNumber,
         id: toString(persons.length + 1)
    }
    
    const updatedList = persons.concat(objName)
    
    setPersons(updatedList)
    }
    
   
  }
  
   const filteredName = filter.trim()
        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons


  

  return (
    <div>
      <SearchFilter value = {filter} onChange = {handleFilter}></SearchFilter>
      <Phonebook onSubmit={addName} valueName={newName} valueNumber={newNumber} onChangeName={handleNewName} onChangeNumber={handleNewNumber}></Phonebook>
      <Numbers filteredName={filteredName}></Numbers>
      
    </div>
  )
}

export default App