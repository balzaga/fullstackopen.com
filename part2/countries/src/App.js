import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

    const [countries, setCountries] = useState([])

    const hook = () => {
        console.log('effect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }

    useEffect(hook, [])
    console.log('render', countries.length, 'countries')


    const [filter, setFilter] = useState('')

    const handleFilterChange = (event) => {
        //console.log('Filter value ', event.target.value)
        setFilter(event.target.value)
    }

    const filterByName = (country) => {
		//console.log('filtro: ', filter)
		if (filter === null || filter.length === 0) {
			return true
		}
		//console.log('person.name: ', person.name)
		//console.log('pasa el filtro: ', person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
		return country.name.official.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
	}

	const countriesToShow = countries.filter(filterByName)


    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <div>
                <Countries countries={countriesToShow} />
            </div>
        </div>
    )
}
export default App 