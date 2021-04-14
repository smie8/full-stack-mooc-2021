import React from 'react'
import CountryInfo from './CountryInfo'

const SearchResults = ({ countries, searchBox, handleSearchBoxChange}) => {
    let searchResults = countries
    let message = ''
    let showResults = false

    if (searchBox.length > 0) {
        searchResults = searchResults.filter(country => country.name.substring(0, searchBox.length).toLowerCase() === searchBox.toLowerCase())
    }

    if (searchResults.length < 10) {
        showResults = true
    } else {
        showResults = false
    }

    const showOneCountry = (event) => {
        handleSearchBoxChange(event)
    }

    const searchResultsMapped = searchResults
        .map(country => <div key={country.name}>{country.name}<button onClick={showOneCountry} value={country.name}>show</button></div>)

    if (searchBox.length > 0) {
        if (searchResults.length > 10) {
            message = 'Too many matches (' + searchResults.length + '), specify another filter'
        } else if (searchResults.length < 1) {
            message = 'No matches'
        }
    }

    return (
        <div>
            <p>{message}</p>
            {showResults && searchResults.length !== 1 ? searchResultsMapped : ''}
            {searchResults.length === 1 ? <CountryInfo country={searchResults[0]} /> : ''}
        </div>
    )
}

export default SearchResults