import Weather from './Weather'

const Country = ({ country }) => {
    let languages = [];
    Object.keys(country.languages).forEach(function (key) {
        languages.push(country.languages[key]);
    });

    const capital = country.capital[0]

    return (
        <div>
            <h2>{country.name.official}</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Capital</td>
                        <td>{country.capital.map(capital => <div>{capital}</div>)}</td>
                    </tr>
                    <tr>
                        <td>Population</td>
                        <td>{country.population}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Languages</h3>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <p>
                <img src={country.flags.png} alt="flag" />
            </p>
            <Weather capital={capital} />
        </div>
    )
}
export default Country