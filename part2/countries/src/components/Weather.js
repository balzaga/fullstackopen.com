import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {

    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(true);
    console.log('capital ', capital);

    useEffect(() => {
        getweather();
        // eslint-disable-next-line
    }, []);

    const getweather = () => {
        const apikey = process.env.REACT_APP_WEATHER_API_KEY
        const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + apikey + '&query=' + capital + '&units=m'
        console.log('weatherUrl ', weatherUrl);
        axios.get(weatherUrl).then((response) => {
            console.log('promise fulfilled', response.data)
            setWeather(response.data)
            setLoading(false);
        });
    };

    if (isLoading) {
        return <div>Loading weather data...</div>;
    }


    return (
        <>
            <h3>Weather in {capital}</h3>
            <table>
                <tbody>
                    <tr>
                        <td><b>Temparature:</b>&nbsp;{weather.current.temperature}&nbsp;<sup>o</sup>C</td>
                    </tr>
                    <tr>
                        <td><img src={weather.current.weather_icons} alt="weather" /></td>
                    </tr>
                    <tr>
                        <td><b>Wind:</b>&nbsp;{weather.current.wind_speed}&nbsp;Km/h&nbsp;direction&nbsp;{weather.current.wind_dir}</td>
                    </tr>
                </tbody>
            </table>
            <p>&nbsp;</p>
        </>
    )


}
export default Weather