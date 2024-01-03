import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {

	const [persons, setPersons] = useState([])

	const hook = () => {
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
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
			alert(`${newName} is already added to phonebook`)
			setNewName('')
			setNewTelephone('')
			document.getElementById("name").focus()
		} else {
			const personObject = {
				id: persons.length,
				name: newName,
				telephone: newTelephone
			}
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewTelephone('')
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
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h3>Add a new person</h3>
			<PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
				newTelephone={newTelephone} handleTelephoneChange={handleTelephoneChange} />
			<h3>Numbers</h3>
			<Persons persons={personsToShow} />
		</div>
	)
}

export default App