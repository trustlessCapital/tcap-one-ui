//company api's
// import axios from 'axios'; // may be used in future
import { handleResponse, handleError } from 'services/api/utlities/response'; 

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = 'http://18.118.12.136/api/company'; 
var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
/** @param {object} signupData */ 
const signUp = (signupData) => { 

return fetch(`${BASE_URL}/signup`, {
   ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
  }).then(handleResponse)
  .catch(handleError);
}; 
/** @param {object} signupData */ 
const resendOTP = (signupData) => { 

    return fetch(`${BASE_URL}/signup/resendOTP`, {
       ...requestOptions,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      }).then(handleResponse)
      .catch(handleError);
    }; 

    /** @param {object} having  */ 
    const verifyOTP = (signupData) => { 

        return fetch(`${BASE_URL}/signup/verifyOTP`, {
           ...requestOptions,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
          }).then(handleResponse)
          .catch(handleError);
        }; 
        


export const companyApiProvider = { 
  signUp, 
  resendOTP,
  verifyOTP,
};