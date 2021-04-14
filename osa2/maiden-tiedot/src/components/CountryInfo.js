import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ country }) => {

    return (
        <div>
            <h3>{country.name}</h3><br />
            capital: {country.capital}<br />
            population: {country.population}<br />
            <h4>languages</h4>
            <ul>
                {country.languages.map(language => {
                    return <li key={language.name}>{language.name}</li>
                })}
            </ul>
            <img src={country.flag} alt='flag' width='100px' border="1px solid" /><br />
            <Weather capital={country.capital}/>
        </div>
    )

}

export default CountryInfo