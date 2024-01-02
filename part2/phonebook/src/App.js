import React, { useState } from 'react'
import Person from './components/Person'


const App = () => {

    const [persons, setPersons] = useState(
        [
            { id: 0, name: 'Arto Hellas', telephone: '983112233' },
            { id: 1, name: 'Ada Lovelace', telephone: '947225588' },
            { id: 2, name: 'Dan Abramov', telephone: '981336699' },
            { id: 3, name: 'Mary Poppendieck', telephone: '923115599' }
        ]
    )

    const [newName, setNewName] = useState('')
    const [newTelephone, setNewTelephone] = useState('')
    const [filter, setFilter] = useState('')

    const handleNameChange = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleTelephoneChange = (event) => {
        //console.log(event.target.value)
        setNewTelephone(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log('Filter value ', event.target.value)
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        //console.log('button clicked', event.target)
        console.log('newName ', { newName })
        console.log('newTelephone ', { newTelephone })
        const encontrado = persons.find((element) => element.name === newName)
        console.log('encontrado ', encontrado)
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

    const filterByName = (person) => {
        console.log('filtro: ', filter)
        if (filter === null || filter.length === 0) {
            return true
        }
        console.log('person.name: ', person.name)
        console.log('pasa el filtro: ', person.name.toLowerCase().indexOf(filter.toLowerCase())  !=  -1)
        return person.name.toLowerCase().indexOf(filter.toLowerCase())  !=  -1;
    }

    const personsToShow = persons.filter(filterByName)

    console.log('personsToShow: ', personsToShow)

    return (
        <div>
            <form onSubmit={addPerson}>
                <h2>Phonebook</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Filter shown with:</td>
                            <td><input value={filter} onChange={handleFilterChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <h2>Add a new person</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input id="name" value={newName} onChange={handleNameChange} /></td>
                        </tr>
                        <tr>
                            <td>Telephone number:</td>
                            <td><input value={newTelephone} onChange={handleTelephoneChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button type="submit">add person</button>
                </div>
                <h2>Numbers</h2>
                <ul>
                    {personsToShow.map(person => <Person person={person} />)}
                </ul>
            </form>
        </div>
    )
}

export default App