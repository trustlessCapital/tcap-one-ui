//company api's
// import axios from 'axios'; // may be used in future
import { handleResponse, handleError } from 'services/api/utlities/response'; 

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = 'https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/v1'; 
const clientToken = window.localStorage.getItem('utoken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMTUwYzNmLTQ1MWMtNDUzMC1hMjQ4LWUxNGQwNTdkMzBjOCIsImVtYWlsIjoicGFydGhkYWxhbDA2QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzkxNzAzMDIwNzg5NyIsInN0YXR1cyI6ImFjdGl2ZSIsImlzUGhvbmVWZXJpZmllZCI6ZmFsc2UsImlzRW1haWxWZXJpZmllZCI6ZmFsc2UsImlzTW5lbW9uaWNDcmVhdGVkIjpmYWxzZSwiaXNBY2NvdW50VW5sb2NrZWQiOmZhbHNlLCJsYXN0TG9naW5BdCI6IjIwMjEtMTAtMTVUMTU6NTQ6MzcuMDAwWiIsIndhbGxldEFkZHJlc3MiOm51bGwsInByaXZhdGVLZXlBZGRyZXNzIjpudWxsLCJmdXR1cmVBZGRyZXNzIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTEwLTE1VDE1OjU0OjM2Ljg0MVoiLCJ1cGRhdGVkQXQiOiIyMDIxLTEwLTE1VDE1OjU0OjM2Ljg0MVoiLCJ1c2VyVHlwZSI6ImludmVzdG9yIiwiaWF0IjoxNjM0MzEzMzQ2fQ.h4Azss3pMNgPFY6xa_h4IH8ZkwjbiuDItH6KZq-_2co';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + clientToken,
}
const democompanydata = 
  {
    "email": "lingraj@trustless.capital",   
    "phoneNumber": "+917783086364",
    "address": "B-105, Wakad Center, bhumkar chowk",
    "city": "Pune",
    "state": "Maharashtra",
    "country": "IND",
    "adminName": "IND",
    "companyId": "PAN/CIN",
    "organisationName": "Trustless Pvt Ltd",
    "type": "private",
  
}
var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
/** @param {object} signupData */ 
const signUp = (signupData) => { 

return fetch(`${BASE_URL}/signup`, {
   ...requestOptions,
    headers: {
      ...headers
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
         ...headers
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
              ...headers
            },
            body: JSON.stringify(signupData),
          }).then(handleResponse)
          .catch(handleError);
        }; 

        const submitCompany = (companyData) => { 
          companyData.phoneNumber = `+${companyData.phoneNumber}`;
          https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/v1/company
          return fetch(`${BASE_URL}/company`, {
             ...requestOptions,
              headers: {
                ...headers
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