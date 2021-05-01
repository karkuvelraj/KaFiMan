import { handleResponse, handleError ,addParams} from "./apiUtils";
const baseUrl = process.env.API_URL + "/shopitems";
export function getAll(){
    return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getShopItemsById(id){
    return fetch(addParams(baseUrl,{id}))
    .then(handleResponse)
    .catch(handleError);
}

export function updateShopItem(shopitem){
    return fetch(baseUrl+'/'+shopitem.id,{method:'PUT',body:JSON.stringify(shopitem)})
    .then(handleResponse)
    .catch(handleError);
}
export function createShopItem(shopitem){
    return fetch(baseUrl+'/'+shopitem.id,{method:'POST',body:JSON.stringify(shopitem)})
    .then(handleResponse)
    .catch(handleError);
}