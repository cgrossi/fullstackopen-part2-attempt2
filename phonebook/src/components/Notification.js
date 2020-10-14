import React from 'react';

const Notification = ({ message: { message, type } }) => {
  let successStyle = {
    padding: 10,
    margin: 5,
    display: 'inline block',
    backgroundColor: '#16c98d',
    color: 'white',
    borderRadius: 5
  }
  let errorStyle = {
    padding: 10,
    margin: 5,
    display: 'inline block',
    backgroundColor: '#fa5e5b',
    color: 'white',
    borderRadius: 5
  }
  if(message === null) {
    return null;
  }

  return (
    <div style={type === 'success' ? successStyle : errorStyle}>
      {message}
    </div>
  )
}

export default Notification;