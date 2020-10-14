import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './Search';
import Display from './Display';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [isQuery, setIsQuery] = useState(false);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(response => {
          setCountries(response.data); 
         })
  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value);
    search.length > 0 ? setIsQuery(true) : setIsQuery(false);
  }

  const handleShow = country => e => {
    setSearch(country);
  }

  const countriesToShow = isQuery ? countries.filter(country => country.name.toLowerCase().includes(search)) : countries;

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Display countriesToShow={countriesToShow} handleShow={handleShow} />
    </div>
  )
}

export default App;