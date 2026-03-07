import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    axios.get(url)
      .then(response => setCountries(response.data))
  }, [])

  const filtered = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .startsWith(search.toLowerCase())
  )

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <div>
        Find Country{' '}
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setSelectedCountry(null)
          }}
        />
      </div>

      <Display
        countries={filtered}
        selectedCountry={selectedCountry}
        handleShow={handleShow}
      />
    </div>
  )
}

const Display = ({ countries, selectedCountry, handleShow }) => {

  if (selectedCountry) {
    return <CountryDetail country={selectedCountry} />
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>
              show
            </button>
          </li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return null
}

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_KEY
  const capital = country.capital?.[0]

  useEffect(() => {
    if (!capital) return

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then(response => setWeather(response.data))
  }, [capital, apiKey])

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>Capital: {capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>

      <img src={country.flags.png} alt="flag" width="150" />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  )
}

export default App