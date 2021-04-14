import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [ forecast, setForecast ] = useState([])

    const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

    useEffect(() => {
        console.log('effect2')
        axios
            .get('http://api.weatherstack.com/forecast?access_key=' + api_key + '&query=' + capital)
            .then(response => {
            console.log('promise2 fulfilled')
            console.log(response.data)
            setForecast(response.data.current)
        })
    }, [])

    return (
        <div>
            <h4>Weather in {capital}</h4>
            temperature: {forecast.temperature} Celcius
            <br />
            <img src={forecast.weather_icons} />
            <br />
            wind: {forecast.wind_speed} mph, direction {forecast.wind_dir}
        </div>
    )

}

export default Weather