import React from 'react';

const Bienvenue = () => {

  const redirectToTest = () => {
    window.location.href = 'http://localhost:3001/test';
  };

  return (
    <div className="bienvenue">
      <h1>Bienvenue sur notre application!</h1>
      <button onClick={redirectToTest}>Aller à Test</button>
    </div>
  );
};

export default Bienvenue;
