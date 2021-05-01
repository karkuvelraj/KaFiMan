import * as flightApi  from "../../api/flightApi.js"
import { types } from "./actions";
export  function loadFlights(){
    return (dispatch)=>{
        flightApi.getAll().then(flights=>{
            dispatch({ type:types.LOAD_FLIGHTS , flights }  )
            return flights
        })
        
    }
}
export  function updateFlight(flight){
    return (dispatch)=>{
        flightApi.updateFlight(flight).then(flight=>{
            dispatch({ type:types.UPDATE_FLIGHT , flight }  )
            return flight
        })
        
    }
}
