import { handleResponse, handleError ,addParams} from "./apiUtils";
const baseUrl = process.env.API_URL + "/services";
export function getAll(){
    return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getServicesById(id){
    return fetch(addParams(baseUrl,{id}))
    .then(handleResponse)
    .catch(handleError);
}

export function updateService(Service){
    return fetch(baseUrl+'/'+Service.id,{method:'PUT',body:JSON.stringify(Service)})
    .then(handleResponse)
    .catch(handleError);
}
export function createService(Service){
    return fetch(baseUrl+'/'+Service.id,{method:'POST',body:JSON.stringify(Service)})
    .then(handleResponse)
    .catch(handleError);
}