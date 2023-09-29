import { useState } from 'react'
import './App.css'


const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = import.meta.env.VITE_API_KEY;
console.log(apiKey)

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);

  const showWeather = async (inputValue) => {
    try{
      const response = await fetch(`${url}&q=${inputValue}&appid=${apiKey}`);
      
      if(!response.ok) throw new Error("City not found");
      const data = await response.json();
      console.log(data)
      setCity(data.name);
      setWeatherData(data)
      setError(null)
    } catch(error) {
      console.error(error);
      setCity('')
      setWeatherData(null)
      setError(error)
    }
  }

  const handleSearch = () => {
    showWeather(inputValue);
    setInputValue('')
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleKeydown = (event) => {
    if(event.key === 'Enter') {
      showWeather(inputValue);
      setInputValue('')
    }
  }

  return (
    <div>
      <nav>
        <h1 className='nav-left'>W<span className='red'>e</span><span className='yellow'>a</span><span className='orange'>t</span><span className='green'>h</span><span className='blue'>e</span><span className='purple'>r</span> App</h1>
        <div className='nav-right'>
          <input
            type='text'
            placeholder='Enter City Name'
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeydown}
            />
            <button className='searchBtn' onClick={handleSearch}>Search</button>
        </div>
      </nav>
        {error && <p className='error'>{error.message}</p>}

        {weatherData && (
          <div className='main'>
              <h2 className='cityName'>{city}, {weatherData.sys.country}</h2>
              <div className='iconAndTemp'>
                <div className='iconAndDesc'>
                  <img className='weatherIcon' src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt={weatherData.weather[0].description} />
                  <p className='weatherDescription'>{weatherData.weather[0].description} </p>
                </div>
                <div className='description-right'>
                  <h2 className='temp'>{Math.round(weatherData.main.temp)} °C</h2>
                  <p className='feelsLike'>Feels like {Math.round(weatherData.main.feels_like)} °C</p>
                  <p className='wind'>Wind: {weatherData.wind.speed.toFixed(1)} m/s</p>
                  <p className='humidity'>Humidity: {weatherData.main.humidity} %</p>
                </div>
              </div>
          </div>
        )}
    </div>
  )
}


export default App
