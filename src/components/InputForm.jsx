import React from "react";
import {useState} from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { ERROR_UPDATE_LOCATION, GET_WEATHER_DATA, SUCCESS_UPDATE_LOCATION } from "../reduxWeather/type/ActionType";

const apiKey='AMnyxAGcn2GrUlNQKedeKrMuFIcms2zC'
export default function InputForm() {
    const [search, setSearch]= useState('');
    const [city, setCity]= useState('');
    const [coordinates, setCoordinates]= useState({lat:-1,long:-1});
    const dispatch= useDispatch();
   
    //get user coordinates
    const showPosition= (position)=>{
        const lat = position.coords.latitude;
        const long = position.coords.longitude;   
        setCoordinates({lat,long})
    }
    const getCurrentLocation=()=>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }else{
        console.log("Geolocation is not supported by this browser.")
      }
    }
   
     useEffect(() => {
      getCurrentLocation()
      const {lat,long} = coordinates;
      //get current city name
      const getCurrentCity = async(latitude,longitude)=>{
        try{
          let res = await Axios({
            method: 'GET',
            url:`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}&language=en-us`
          })
         if(res.status === 200){
            let currentCity = res.data?.EnglishName;
            setCity(currentCity)
          }
        }catch(err){
          console.log('err',err)
        }
      }
      getCurrentCity(lat,long);
     },[coordinates.lat])
     
     useEffect(()=>{
      const getLocationKey = async()=>{
          try{
              let result = await Axios({
                  method: 'GET',
                  url:`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&language=en-us`
              })
              if(result.status===200){
                let locationKey = result.data[0]?.Key;
               //get weather data
                  if(locationKey){
                    let weatherDetailRes = await Axios({
                        method: 'GET',
                        url:`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&language=en-us&details=true&metric=true`,
                    })
                    let res= weatherDetailRes.data?.DailyForecasts[0];
                      dispatch({
                        type: GET_WEATHER_DATA, 
                        payload: {
                          country: result.data[0].Country.ID,
                          city: result.data[0].EnglishName,
                          minTemp:  res.Temperature.Minimum.Value,
                          maxTemp: res.Temperature.Maximum.Value,
                          iconDay: res.Day.Icon,
                          iconNight:res.Night.Icon,
                          dayWeather:res.Day.IconPhrase,
                          nightWeather: res.Night.IconPhrase,
                          windSpeedDay: res.Day.Wind.Speed.Value,
                          windSpeedNight: res.Night.Wind.Speed.Value,
                        }
                      })
                      dispatch({type: SUCCESS_UPDATE_LOCATION})
                    }else{
                      console.log('locationKey is undefined')
                      dispatch({type: ERROR_UPDATE_LOCATION})
                    }
              }
          }catch(err){
              console.log(err)
          }
      }
      getLocationKey()
    },[city])

    const handleSubmit=(e)=>{
        e.preventDefault();
        setCity(search)
        setSearch('');
    }
  return (
    <form className="input-group flex-nowrap" onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
        className="form-control"
        placeholder="Enter the name of a city"
        required
      />
      <button
        type='submit'
        style={{ backgroundColor: "#BDBDBD", cursor: "pointer" }}
        className="input-group-text btn__search"
      >
        <i className="fas fa-search" />
      </button>
    </form>
  );
}
