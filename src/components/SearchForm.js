import React, { useRef, useState } from 'react'

export const SearchForm = ({onSubmitHandler, err, setErr}) => {
    const CityFieldRef = useRef(null);
    const CountryFieldRef = useRef(null);

    const onSubmitSearchFrm = (e) => { 
        e.preventDefault();
        const city = CityFieldRef.current.value.trim();
        const country  = CountryFieldRef.current.value.trim();
        if(city && country){
            onSubmitHandler(city, country);
        }else{
            setErr('Please fill out the fields.');
        }
    }


  return (
    <div>
        <form className="px-3 pt-2 pt-md-5 mx-auto row align-items-md-center justify-content-md-center" onSubmit={onSubmitSearchFrm}>
            <div className="form-group mb-3 col-12 col-md-4 me-md-3">
                {/* <label htmlFor="city">City</label> */}
                <input type="text" id="city" placeholder="City" autoComplete="off" className="form-control bg-transparent border-0 p-1 text-secondary text-md-center" ref={CityFieldRef}/>
            </div>

            <div className="form-group mb-3 mb-3 col-12 col-md-4 me-md-3">
                {/* <label htmlFor="country">Country</label> */}
                <input type="text" id="country" placeholder='Country' autoComplete="off" className="form-control bg-transparent border-0 p-1 text-secondary text-md-center" ref={CountryFieldRef}/>
            </div>

            <input type="submit" value="Get weather" className="btn btn-light text-dark mb-3 col-3 col-md-2"/>
        </form>
    </div>
  )
}
