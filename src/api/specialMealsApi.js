import { handleResponse, handleError ,addParams} from "./apiUtils";
const baseUrl = process.env.API_URL + "/specialmeals";
export function getAll(){
    return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getSpecialMealsById(id){
    return fetch(addParams(baseUrl,{id}))
    .then(handleResponse)
    .catch(handleError);
}

export function updateSpecialMeal(specialmeal){
    return fetch(baseUrl+'/'+specialmeal.id,{method:'PUT',body:JSON.stringify(specialmeal)})
    .then(handleResponse)
    .catch(handleError);
}
export function createSpecialMeal(specialmeal){
    return fetch(baseUrl+'/'+specialmeal.id,{method:'POST',body:JSON.stringify(specialmeal)})
    .then(handleResponse)
    .catch(handleError);
}