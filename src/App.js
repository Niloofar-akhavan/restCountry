import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import CountryList from './Components/CountryList';
import CountryDetail from './Components/CountryDetail';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<CountryList darkMode={darkMode} />} />
        <Route path="/country/:code" element={<CountryDetail darkMode={darkMode} />} />
      </Routes>
    </div>
  );
}

export default App;
