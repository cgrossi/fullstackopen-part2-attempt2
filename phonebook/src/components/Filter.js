import React from 'react';

const Filter = ({ newSearch, handleSearch }) => {
  return (
    <div>
      filter names with <input value={newSearch} onChange={handleSearch} />
    </div>
  )
}

export default Filter;

