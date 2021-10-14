//company api's
// import axios from 'axios'; // may be used in future
import { handleResponse, handleError } from 'services/api/utlities/response'; 

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = 'https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/v1'; 
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

        const submitCompany = (companyData) => { 
          https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/v1/company
          return fetch(`${BASE_URL}/company`, {
             ...requestOptions,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(companyData),
            }).then(handleResponse)
            .catch(handleError);
          }; 
        


export const companyApiProvider = { 
  signUp, 
  resendOTP,
  verifyOTP,
  submitCompany
};