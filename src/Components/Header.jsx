import React from 'react';
import './Header.css';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="container">
        <h1>Where in the world?</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          <i className="fas fa-moon"></i>
          {darkMode ? ' Light Mode' : ' Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;
