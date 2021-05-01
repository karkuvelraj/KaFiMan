import { handleResponse, handleError ,addParams} from "./apiUtils";
const baseUrl = process.env.API_URL + "/users/";

export function getUser(id) {
  return fetch(addParams(baseUrl,id))
    .then(handleResponse)
    .catch(handleError);
}
