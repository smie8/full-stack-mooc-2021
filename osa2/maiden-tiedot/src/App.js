import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResults from './components/SearchResults'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchBox, setSearchBox ] = useState('')
  // const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
    // axios
    //   .get('http://api.weatherstack.com/forecast?access_key=' + api_key + '&query=Helsinki')
    //   .then(response => {
    //     console.log('promise 2 fulfilled')
    //     console.log(response.data)
    //   })
    })
  }, [])

  const handleSearchBoxChange = (event) => {
    setSearchBox(event.target.value)
  }

  return (
    <div>
        find countries <input value={searchBox} onChange={handleSearchBoxChange} />       
        <SearchResults countries={countries} searchBox={searchBox} handleSearchBoxChange={handleSearchBoxChange} />
    </div>
  );
}

export default App;
