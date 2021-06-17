import React, { useEffect, useState } from 'react'
import FilterBox from './components/FilterBox'
import AddNewPersonForm from './components/AddNewPersonForm'
import Numbers from './components/Numbers'
import personService from './services/personService'
import NotificationBox from './components/NotificationBox'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ personId, setPersonId ] = useState()
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notificationStyle, setNotificationStyle ] = useState('')

  useEffect(() => {
    getAllPersons()
  }, [])

  const getAllPersons = () => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }

  const addPerson = (event) => {
    const namesArr = persons.map(person => person.name)
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }
    
    if (personObj.name && !namesArr.includes(newName) && newName.length > 0) {
      personService
        .create(personObj)
          .then(person => {
            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
            setNotificationStyle('success')
            activateNotification(`Added ${personObj.name} to phonebook`)
          })
          .catch(error => {
            console.log(error.response.data)
            setNotificationStyle('error')
            activateNotification(error.response.data.error)
          })
    } else {
      window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      updatePerson(person.id, personObj)
    }
  }

  const updatePerson = (id, personObj) => {
    personService
      .update(id, personObj)
        .then(person => {
          getAllPersons()
          setNewName('')
          setNewNumber('')
          setNotificationStyle('success')
          activateNotification(`Updated number for ${personObj.name}`)
        })
        .catch(error => {
          console.log(error)
          setNotificationStyle('error')
          activateNotification(`Cannot find ${personObj.name}. Update unsuccessful.`)
          setPersons(persons.filter(person => person.name !== personObj.name))
        })
  }

  const handleDelete = (id) => {
    setPersonId(id)
    const name = persons.find(person => person.id === id).name
    
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(`# ${personId} deleted`)
          setPersonId('')
          console.log(res)
          setNotificationStyle('delete')
          activateNotification(`Deleted ${name} from phonebook`)
        })
    }
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value.toLowerCase())
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const activateNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const searchResults = persons.filter(
    person => person.name.substring(0, searchName.length).toLowerCase() === searchName
  )
  
  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationBox notification={notification} notificationStyle={notificationStyle} />
      <FilterBox searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      <AddNewPersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Numbers searchResults={searchResults} personId={personId} handleDelete={handleDelete} />
    </div>
  )

}

export default App