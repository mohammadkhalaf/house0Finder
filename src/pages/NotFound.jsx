import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <p>Page can not be found</p>
      <Link
        to='/'
        style={{
          backgroundColor: 'black',
          color: 'white',
          width: 'fit-content',
          margin: 'auto',
          padding: '7px 12px',
          cursor: 'pointer',
        }}
      >
        Back to home page
      </Link>
    </div>
  );
};

export default NotFound;
