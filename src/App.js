import React, { useState } from 'react';
import axios from 'axios';

function App() {
/* ALT 0176 for Degree Symbol*/

  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  const [unit, setUnit] = useState('metric');
  const toggleUnit = () => {
    setUnit(unit => unit === 'imperial' ? 'imperial' : 'metric');
  }
  
  /*https://api.openweathermap.org/data/2.5/weather?q=houston&appid=cd10c53bef5d5bfbf9d7574cfb1cb290*/
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=cd10c53bef5d5bfbf9d7574cfb1cb290`
  
  
  const searchLocation = (event) => {
    if(event.key==='Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('');
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input 
        value = {location}
        onChange = {event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"/>
      </div>
      <button 
      id="unit"
      onclick = {toggleUnit}>
        Switch to {unit === 'imperial' ? 'Celsius' : 'Fahrenheit'}
      </button>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        
      </div>
          {data.name !== undefined &&
            <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
          }
        


      </div>
    </div>
  );
}

export default App;
