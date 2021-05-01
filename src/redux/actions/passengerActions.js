import * as passengerApi  from "../../api/passengerApi"
import { types } from "./actions";
export  function loadPassengers(){
    return (dispatch)=>{
        passengerApi.getAll().then(passengers=>{
            dispatch({ type:types.LOAD_PASSENGERS , passengers }  )
            return passengers
        })
    }
}
export  function loadPassengersByFlightId(flightName){
    return (dispatch)=>{
        passengerApi.getPassengersById(flightName).then(passengers=>{
            dispatch({ type:types.LOAD_PASSENGERS_BY_FLIGHT , passengers }  )
            return passengers
        })
    }
}
export function updatePassenger(passenger){
    return (dispatch)=>{
        passengerApi.updatePassenger(passenger).then(()=>{
            dispatch({type:types.UPDATE_PASSENGER,passenger})
            return passenger
        })
    }
}
export function addPassenger(passenger){
    return (dispatch)=>{
        passengerApi.addPassenger(passenger).then(()=>{
            dispatch({type:types.ADD_PASSENGER,passenger})
            return passenger
        })
    }
}
export function clearState(){
    return {type:types.CLEAR_STATE}
}