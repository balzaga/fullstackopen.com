import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

	const [persons, setPersons] = useState([])
	const [message, setMessage] = useState(null)
	const [typeMessage, setTypeMessage] = useState(null)

	const hook = () => {
		console.log('effect')
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			}).catch(error => {
				setTypeMessage('error')
				setMessage(`Error getting numbers '${error}'`)
				setTimeout(() => { setMessage(null) }, 4000)
			})
	}

	useEffect(hook, [])
	console.log('render', persons.length, 'persons')

	const [newName, setNewName] = useState('')
	const [newTelephone, setNewTelephone] = useState('')


	const handleNameChange = (event) => {
		//console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleTelephoneChange = (event) => {
		//console.log(event.target.value)
		setNewTelephone(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		//console.log('button clicked', event.target)
		//console.log('newName ', { newName })
		//console.log('newTelephone ', { newTelephone })
		const encontrado = persons.find((element) => element.name === newName)
		//console.log('encontrado ', encontrado)
		if (encontrado != null) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				encontrado.number = newTelephone;
				personService.update(encontrado.id, encontrado)
					.then(personUpdated => {
						setTypeMessage('success')
						console.log(`'${encontrado.name}' update with ${newTelephone}`);
						setMessage(`Added '${encontrado.name}'`)
						setTimeout(() => { setMessage(null) }, 4000)
						setNewName('')
						setNewTelephone('')
					}).catch(error => {
						setTypeMessage('error')
						setMessage(`Error updating ${encontrado.name} '${error}'`)
						setTimeout(() => { setMessage(null) }, 4000)
					})
			} else {
				document.getElementById("name").focus()
			}
		} else {
			const personObject = {
				name: newName,
				number: newTelephone
			}
			personService
				.create(personObject)
				.then(returnedPerson => {
					setTypeMessage('success')
					setMessage(`Added '${returnedPerson.name}'`)
					setTimeout(() => { setMessage(null) }, 4000)
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewTelephone('')
				}).catch(error => {
					setTypeMessage('error')
					setMessage(`Error adding ${newName} '${error}'`)
					setTimeout(() => { setMessage(null) }, 4000)
				})
		}
	}

	const deletePerson = (id) => {
		const person = persons.find(p => p.id === id)
		if (!person) {
			alert('Person to delete not found');
		} else if (window.confirm(`Do you really want to delete data from ${person.name}?`)) {
			personService.deletePerson(id)
				.then(personJustDeleted => {
					console.log('Person ', id, 'deleted')
					setTypeMessage('success')
					setMessage(`The person '${person.name}' was deleted!`)
					setTimeout(() => { setMessage(null) }, 4000)

				})
				.catch(error => {
					setTypeMessage('error')
					setMessage(`The person '${person.name}' was already deleted from server`)
					setTimeout(() => { setMessage(null) }, 4000)
				})
			setPersons(persons.filter(n => n.id !== id))
		}
	}

	const [filter, setFilter] = useState('')

	const handleFilterChange = (event) => {
		//console.log('Filter value ', event.target.value)
		setFilter(event.target.value)
	}

	const filterByName = (person) => {
		//console.log('filtro: ', filter)
		if (filter === null || filter.length === 0) {
			return true
		}
		//console.log('person.name: ', person.name)
		//console.log('pasa el filtro: ', person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
		return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
	}

	const personsToShow = persons.filter(filterByName)

	//console.log('personsToShow: ', personsToShow)

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} typeMessage={typeMessage} />
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h3>Add a new person</h3>
			<PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
				newTelephone={newTelephone} handleTelephoneChange={handleTelephoneChange} />
			<h3>Numbers</h3>
			<Persons persons={personsToShow} deletePerson={deletePerson} />
		</div>
	)
}

export default App