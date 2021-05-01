export async function handleResponse(response) {
    if (response.ok) return response.json();
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    }
    throw new Error("Network response was not ok.");
  }
  
  
  export function handleError(error) {
    // eslint-disable-next-line no-console
    console.log("API call failed. " + error);
    // throw error;
  }

  export function addParams(baseUrl,params){
    let url = new URL(baseUrl)
    url.search = new URLSearchParams(params).toString();
    return url
  }
  