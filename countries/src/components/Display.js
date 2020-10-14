import React from 'react';

import Country from './Country';

const Display = ({ countriesToShow, handleShow }) => {
  if (countriesToShow.length > 10) {
    return <div>Too many countries. Please be more specific</div>
  } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => <p key={country.numericCode} >{country.name} <button onClick={handleShow(country.name.toLowerCase())}>show</button></p>)}
      </div>
    )
  } else if (countriesToShow.length === 1) {
      return (
        <Country country={countriesToShow[0]} />
      )
  }
  return null;
}

export default Display;