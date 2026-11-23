import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Title from './components/Title'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState({
    success: null,
    error: null,
  })

  useEffect(() => {
    personsService.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
        setIsLoading(false)
      })
  }, [])

  if (!persons) {
    return null
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(p => p.name.trim().toLowerCase() === newName.trim().toLowerCase())

    if (newName === '' || newNumber === '') {
      setMessages({ success: null, error: "Both name and number can't be empty!" })
      setTimeout(() => setMessages({ success: null, error: null }), 3000)
      return
    }

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        const id = existingPerson.id
        const changedPerson = { ...existingPerson, number: newNumber }

        personsService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))

            setMessages({ success: `Updated ${newName}'s Number`, error: null })
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            setMessages({
              success: null,
              error: error.response.data.error
            })

            if (error.response.status === 404) {
              setPersons(persons.filter(p => p.id !== id))
            }
          })

        setTimeout(() => setMessages({ success: null, error: null }), 3000)
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessages({ success: `${newName} Added Successfully.`, error: null })
        setNewName('')
        setNewNumber('')
        setTimeout(() => setMessages({ success: null, error: null }), 3000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessages({
          success: null,
          error: error.response.data.error,
        })
        setTimeout(() => {
          setMessages({ success: null, error: null })
        }, 3000);
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    personsService
      .delete(id)
      .then(() => {
        setMessages({ success: `${person.name} deleted sucessfully.`, error: null })
      })
      .catch((error) => {
        setMessages({
          success: null,
          error: error.response.data.error,
        })
      })
      .finally(() => {
        setPersons(persons.filter(p => p.id !== id))
        setTimeout(() => {
          setMessages({ success: null, error: null })
        }, 3000)
      })
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const searchString = filter.toLowerCase()

  const filteredPerson = persons.filter((p) =>
    p.name.toLowerCase().includes(searchString))

  if (isLoading) return <p>Loading data...</p>

  return (
    <div>
      <Title title='Phonebook Application' />
      <Filter
        onChange={handleFilterChange}
        value={filter}
        placeholder='search for a name...'
      />
      <Notification
        successMsg={messages.success}
        errorMsg={messages.error}
      />
      <h2>Add a new: </h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        nameValue={newName}
        onNumberChange={handleNumberChange}
        numberValue={newNumber}
      />
      <Title title='Numbers' />
      <ol>
        {filteredPerson.length === 0
          ? <li><p>No matches found!</p></li>
          : <Persons
            persons={filteredPerson}
            deletePerson={deletePerson}
          />
        }
      </ol>
    </div>
  )
}

export default App