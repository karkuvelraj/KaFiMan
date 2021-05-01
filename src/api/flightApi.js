import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/flights/";
export function getAll(){
    return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function updateFlight(flight){
    return fetch(baseUrl+'/'+flight.id,{method:'PUT', headers: {
        'Content-Type': 'application/json',
      },body:JSON.stringify(flight)})
    .then(handleResponse)
    .catch(handleError);
}