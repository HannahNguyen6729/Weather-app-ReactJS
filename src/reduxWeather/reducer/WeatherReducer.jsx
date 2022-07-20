import { ERROR_UPDATE_LOCATION, GET_WEATHER_DATA, SUCCESS_UPDATE_LOCATION } from "../type/ActionType";

const defaultState= {
    weather:{
        country:'DF',
        city:'Default',
        minTemp: 0,
        maxTemp:0,
        iconDay: 0,
        iconNight:0,
        dayWeather:'default',
        nightWeather:'default',
        windSpeedDay: 0,
        windSpeedNight:0,
    },
    notifi:false,
    notiContent:''
}

const weatherReducer = (state = defaultState,action)=>{
    switch(action.type){
        case GET_WEATHER_DATA:{
            return {...state, weather: action.payload}
        }
        case SUCCESS_UPDATE_LOCATION:{
            return {...state, notifi:false}
        }
        case ERROR_UPDATE_LOCATION:{
            return {...state, notifi:true, notiContent: 'Cannot find the location. Try again!'}
        }
        default:
            return {...state}
    }
}
export default weatherReducer;