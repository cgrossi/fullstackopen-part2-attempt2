import React from 'react';

const Person = ({ person, handleDelete }) => {
  return (
    <>
      <p>{person.name} {person.number} <button onClick={handleDelete} id={person.id}>delete</button></p>
    </>
  )
}

export default Person