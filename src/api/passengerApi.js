import { handleResponse, handleError ,addParams} from "./apiUtils";
const baseUrl = process.env.API_URL + "/passengers";
export function getAll(){
    return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getPassengersById(flightNo){
    return fetch(addParams(baseUrl,{flightNo}))
    .then(handleResponse)
    .catch(handleError);
}

export function updatePassenger(passenger){
    return fetch(baseUrl+'/'+passenger.id,{method:'PUT', headers: {
        'Content-Type': 'application/json',
      },body:JSON.stringify(passenger)})
    .then(handleResponse)
    .catch(handleError);
}

export function addPassenger(passenger){
    return fetch(baseUrl,{method:'POST', headers: {
        'Content-Type': 'application/json',
      },body:JSON.stringify(passenger)})
    .then(handleResponse)
    .catch(handleError);
}