import {combineReducers} from 'redux';
import weatherReducer from "./reducer/WeatherReducer";

const rootReducer = combineReducers({
    weatherReducer,
})
export default rootReducer;
