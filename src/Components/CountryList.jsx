import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CountryList.css';

function CountryList({ darkMode }) {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/YonesSaeedi/REST-Country/refs/heads/main/data.json')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error('Error fetching countries:', err));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()) &&
    (region ? country.region === region : true)
  );

  return (
    <div className={`country-list container ${darkMode ? 'dark' : ''}`}>
      <div className="controls">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setRegion(e.target.value)} value={region}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="countries">
        {filteredCountries.map((country) => (
          <Link
            to={`/country/${country.alpha3Code}`}
            key={country.alpha3Code}
            className="card"
          >
            <img src={country.flags.svg} alt={country.name} />
            <div className="info">
              <h3>{country.name}</h3>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Capital:</strong> {country.capital}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
