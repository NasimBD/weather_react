
// weather icons: copy the HTTPS address from github/ Code and to install, head towards https://github.com/erikflowers/weather-icons and use that https: npm i https://github.com/erikflowers/weather-icons.git and import in app.js
//API openweathermap.org

import { useEffect, useRef, useState } from 'react';
import './App.css';
import { SearchForm } from './components/SearchForm';
import { Weather } from './components/Weather';
import 'bootstrap/dist/css/bootstrap.css';

const API_key = '3c9531b76267799b3c856843d5e623c0';

function App() {
  const [err, setErr] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temp, setTemp] = useState('');
  const [temp_max, setTemp_max] = useState('');
  const [temp_min, setTemp_min] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);


  const fetchData = (city, country) => {
    setErr(null);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
    .then(res => {
      if(res.ok) return res.json();
      if(!res.ok) throw Error('Something went wrong. Please try again');
    })
    .then(data => { 
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp(kelvinToCelcius(data.main.temp));
      setTemp_max(kelvinToCelcius(data.main.temp_max));
      setTemp_min(kelvinToCelcius(data.main.temp_min));
      setDescription(data.weather[0].description);
      handleWeatherIcon(data.weather[0].id)

    })
    .catch(err => {
      setErr(err.toString()); //as typeof  err = object
    });
  }


  const handleSearchFrm = (city,country) => {
    fetchData(city,country);
  }


  // According to https://openweathermap.org/weather-conditions & https://erikflowers.github.io/weather-icons/
  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-sunny",
    Clouds: "wi-fog"
  }


  const handleWeatherIcon = (codeP) => {
    switch(true){
      case ( codeP >= 200 && codeP <= 232 ):
        setIcon(weatherIcon.Thunderstorm);
        break;

      case ( codeP >= 300 && codeP <= 321 ):
        setIcon(weatherIcon.Drizzle);
        break;

      case ( codeP >= 500 && codeP <= 531 ):
        setIcon(weatherIcon.Rain);
        break;

      case ( codeP >= 600 && codeP <= 622 ):
        setIcon(weatherIcon.Snow);
        break;

        case codeP === 800:
        setIcon(weatherIcon.Clear);
        break;

      case codeP >= 801 && codeP <= 804:
        setIcon(weatherIcon.Clouds);
        break;

      default:
        setIcon(weatherIcon.Clouds);
    }
  }


  const kelvinToCelcius = (kelvinTemp) => {
    return Math.floor(kelvinTemp - 273.15);
  }


  return (
   <div className="app p-2 py-sm-3 py-md-4">
      {
          err && <h6 className="error alert alert-danger text-center mx-auto">{err}</h6>
      }
     <SearchForm onSubmitHandler={handleSearchFrm} err={err} setErr={setErr}/> 
     {
       !err && temp &&  <Weather err={err} city={city} country={country} temp={temp} temp_max={temp_max} temp_min={temp_min} description={description} icon={icon}/>
     }
    
   </div>
  );
}

export default App;