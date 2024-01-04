import Country from './Country'
import CountryShow from './CountryShow'

const Countries = ({ countries }) => {

    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {

        return (
            <div>
                <Country country={countries[0]} />

            </div>
        )
    } else {

        return (
            <ul>
                {countries.map(country => {

                    return (
                        <li>
                            <CountryShow country={country} />                            
                        </li>
                    )
                })}
            </ul>
        )
    }

}
export default Countries