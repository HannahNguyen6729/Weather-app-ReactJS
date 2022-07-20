import React from "react";
import {useSelector} from "react-redux";
import InputForm from "./InputForm";

export default function Card() {
  const weather = useSelector(state=> state.weatherReducer.weather);
  const noti= useSelector(state=> state.weatherReducer.notifi);
  const notiContent= useSelector(state=> state.weatherReducer.notiContent);
  let {country, city, minTemp, maxTemp, dayWeather, nightWeather, windSpeedNight, windSpeedDay, iconDay, iconNight} = weather;
  
  //Date
  let d = new Date()
  let date = d.getDate()
  let year= d.getFullYear()
  let month= d.toLocaleString('en-GB',{month:'long'})
  let day= d.toLocaleString('en-GB',{weekday:'long'})

  return (
    <div className="py-4 vh-100">
      <div className="card text-white h-100" style={{ backgroundColor: "transparent" }}>
        <div className="card-body" style={{backgroundColor: "rgba(0,0,0,0.8", borderRadius: "20px"}}>
          <InputForm/>
          {noti? (
            <div className='text-center mt-5'> 
              <h4> <span className="text-danger"><i className="fa fa-sad-tear me-1"></i> Error! </span> </h4>
              <p>{notiContent}</p>
            </div>
          ): (
             <div className="text-center mt-5 pt-2">
             <h1 className="card-title"> {city} 
                <span className="badge bg-light text-dark ms-1" style={{fontSize:'10px', transform: 'translateY(-20px)'}}>{country}</span>
             </h1>
             <h5 className="card-text mb-2"> {day}, {month} {date}, {year} </h5>
             <hr />
             <div className="mt-5 d-flex justify-content-around">
               <div>
                 <img src={`https://developer.accuweather.com/sites/default/files/${iconDay<10? `0${iconDay}`: iconDay}-s.png`} alt='iconDay'/>
                 <h6>Day </h6>
                 <p className="mb-0">{dayWeather} </p>
               </div>
               <div>
                 <img src={`https://developer.accuweather.com/sites/default/files/${iconNight<10? `0${iconNight}`: iconNight}-s.png`} alt='iconNight'/>
                 <h6>Night </h6>
                 <p className="mb-0"> {nightWeather} </p>
               </div>
             </div>
             <p className="mb-0 mt-5"> Wind speed (Day | Night): <span className=" ms-0">{windSpeedDay} | {windSpeedNight} km/h </span></p>
             <p className="mb-0"> Temp (Min | Max): <span className=" ms-0"> {minTemp} | {maxTemp} °C </span> </p>
           </div>
          )}
        </div>
      </div>
    </div>
  );
}
