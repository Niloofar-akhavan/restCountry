import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CountryDetail.css';

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/YonesSaeedi/REST-Country/refs/heads/main/data.json'
    )
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (c) => c.alpha3Code.toLowerCase() === code.toLowerCase()
        );
        setCountry(found);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [code]);

  if (!country) return <div>Loading...</div>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-wrapper">
        <div className="flag">
          <img src={country.flags.svg} alt={country.name} />
        </div>

        <div className="info">
          <h2>{country.name}</h2>

          <div className="info-columns">
            <div>
              <p><strong>Native Name:</strong> {country.nativeName}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Subregion:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capital}</p>
            </div>
            <div>
              <p><strong>Top Level Domain:</strong> {country.topLevelDomain?.[0]}</p>
              <p><strong>Currencies:</strong> {country.currencies?.map(c => c.name).join(', ')}</p>
              <p><strong>Languages:</strong> {country.languages?.join(', ')}</p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="borders">
              <strong>Border Countries:</strong>
              <div className="borders-list">
                {country.borders.map((border) => (
                  <button
                    key={border}
                    className="border-box"
                    onClick={() => navigate(`/country/${border}`)}
                  >
                    {border}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
