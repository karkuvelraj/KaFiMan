import { types } from "../actions/actions";

export  function user(state={},action){
    switch(action.type){
        case types.CREATE_USER:
            return action.user
        case types.LOAD_USER:
            return action.user
        default:
            return state
    }
}
export  function flights(state=[],action){
    switch(action.type){
        case types.LOAD_FLIGHTS:
            return action.flights
        case types.UPDATE_FLIGHT:
            return [...state.filter(x=>x.id!=action.flight.id),{...action.flight}]
        default:
            return state
    }
}
export  function passengers(state=[],action){
    switch(action.type){
        case types.LOAD_PASSENGERS:
            return action.passengers
        case types.LOAD_PASSENGERS_BY_FLIGHT:
            return action.passengers
        case types.UPDATE_PASSENGER:
            return [...state.filter(x=>x.id!=action.passenger.id),{...action.passenger}]
        case types.ADD_PASSENGER:
            return [...state.filter(x=>x.id!=action.passenger.id),{...action.passenger}]
        case types.CLEAR_STATE:
            return []
        default:
            return state
    }
}