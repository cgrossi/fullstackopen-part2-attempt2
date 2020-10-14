import React, { useState, useEffect } from 'react'
import numberService from '../services/numberService';

import Filter from './Filter';
import NewContact from './NewContact';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ isFiltered, setIsFiltered ] = useState(false);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');
  const [ notification, setNotification ] = useState({ message: null, type: '' });
  
  useEffect(() => {
    numberService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = e => setNewName(e.target.value);

  const handleNumberChange = e => setNewNumber(e.target.value);

  const handleSearch = e => {
    setNewSearch(e.target.value);
    e.target.value.length > 0 ? setIsFiltered(true) : setIsFiltered(false);
  };

  const personsToShow = isFiltered ? persons.filter(el => el.name.toLowerCase().includes(newSearch.toLowerCase())) : persons;

  const handleSubmit = e => {
    e.preventDefault();
    
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      let replace = window.confirm(`${newName} already exists, replace their number?`)
      if (replace === false) return null;
      let existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

      numberService
        .update(existingPerson.id, {...existingPerson, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNotification({
            ...notification,
            message: `${returnedPerson.name}'s number was successfully changed.`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification({ ...notification, 
              message: null,
              type: ''
            })
          }, 4000)
          setNewName('')
          setNewNumber('')
        })
    } else {
      let newPerson = {
        name: newName,
        number: newNumber
      }
      numberService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNotification({
            ...notification,
            message: `${returnedPerson.name} was successfully added to the phonebook.`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification({ ...notification, 
              message: null,
              type: ''
            })
          }, 4000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (e) => {
    const person = persons.find(person => person.id === +e.target.id)
    const id = person.id

    window.confirm(`Are you sure you wish to delete ${person.name}?`)
    numberService
      .remove(id)
      .then(data => {
        if(Object.keys(data).length === 0) {
          let updated = persons.filter(personToDelete => personToDelete.id !== id)
          setPersons(updated)
          setNotification({
            ...notification,
            message: `${person.name} was successfully deleted from phonebook.`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification({ ...notification, 
              message: null,
              type: ''
            })
          }, 4000)
        }
      })
      .catch(e => {
        setNotification({
          ...notification,
          message: `Info for ${person.name} has already been removed from the server.`,
          type: 'fail'
        })
        setTimeout(() => {
          setNotification({ ...notification, 
            message: null,
            type: ''
          })
        }, 4000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <h3>Add new contact</h3>
      <NewContact handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App