// response.js

export function handleResponse(response) {
    if (response.results) {
      return response.results;
    }
  
    if (response.data) {
      return response.data;
    }
    else if(response.body)
    return response.json();

    return response;
  }

  
  export function handleError(error) {
    if (error.data) {
      return error.data;
    }
    return error;
  }