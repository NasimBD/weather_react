import React from 'react'

export const Weather = (props) => {

  return (
    <div className="weather-container d-flex flex-column align-items-center">
        <h2>{props.city}, {props.country}</h2>
        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt={props.description} />
        <h4 className="fw-bold mb-4">{props.temp}&deg;c</h4>
        {
            makeMinMaxtemp(props.temp_min, props.temp_max)
        }
        <h6 className="fw-bold">{props.description}</h6>
    </div>
  )


  function makeMinMaxtemp(minTemp, maxtemp){
    return (typeof minTemp !== undefined && typeof maxtemp !== undefined) ? (
        <h5 className="mb-3">
            <span className="px-3 px-md-4">{minTemp}&deg;c</span>
            <span className="px-3 px-md-4">{maxtemp}&deg;c</span>
        </h5>
    )
    : null;
  }
}
