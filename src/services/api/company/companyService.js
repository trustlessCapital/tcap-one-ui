//company api's
// import axios from 'axios'; // may be used in future
import { handleResponse, handleError } from "services/api/utlities/response";

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = process.env.REACT_APP_BASE_URL; //based on env
console.log(BASE_URL);
const clientToken = window.localStorage.getItem('utoken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMTUwYzNmLTQ1MWMtNDUzMC1hMjQ4LWUxNGQwNTdkMzBjOCIsImVtYWlsIjoicGFydGhkYWxhbDA2QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzkxNzAzMDIwNzg5NyIsInN0YXR1cyI6ImFjdGl2ZSIsImlzUGhvbmVWZXJpZmllZCI6ZmFsc2UsImlzRW1haWxWZXJpZmllZCI6dHJ1ZSwiaXNNbmVtb25pY0NyZWF0ZWQiOmZhbHNlLCJpc0FjY291bnRVbmxvY2tlZCI6ZmFsc2UsImxhc3RMb2dpbkF0IjoiMjAyMS0xMC0xNVQxNTo1NDozNy4wMDBaIiwid2FsbGV0QWRkcmVzcyI6bnVsbCwicHJpdmF0ZUtleUFkZHJlc3MiOm51bGwsImZ1dHVyZUFkZHJlc3MiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTVUMTU6NTQ6MzYuODQxWiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTVUMTY6Mzc6NTEuMDAwWiIsInVzZXJUeXBlIjoiaW52ZXN0b3IiLCJpYXQiOjE2MzQ4ODYyMjl9.A-6AdTd6IgZcZom0i2PuoBxIjBBVt5_eNsq8Zc4CNcE';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + clientToken,
}

var requestOptions = {
  method: "POST",
  redirect: "follow",
};

/** @param {object} signupData */
const signUp = (signupData) => {
  return fetch(`${BASE_URL}/v1/signup`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(signupData),
  })
    .then(handleResponse)
    .catch(handleError);
};

/** @param {object} signupData */
const resendOTP = (signupData) => {
  return fetch(`${BASE_URL}/v1/signup/resendOTP`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(signupData),
  })
    .then(handleResponse)
    .catch(handleError);
};

/** @param {object} having  */
const verifyOTP = (signupData) => {
  return fetch(`${BASE_URL}/v1/signup/verifyOTP`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(signupData),
  })
    .then(handleResponse)
    .catch(handleError);
};
const submitCompany = (companyData) => { 
  companyData.phoneNumber = `+${companyData.phoneNumber}`;
  return fetch(`${BASE_URL}/v1/company`, {
     ...requestOptions,
      headers: {
        ...headers
      },
      body: JSON.stringify(companyData),
    }).then(handleResponse)
    .catch(handleError);
  }; 

  const createCompanyRelationship = (companyData) => { 
    companyData.vendorContact = `+${companyData.vendorContact}`;
    companyData.anchorContact = `+${companyData.anchorContact}`;
    return fetch(`${BASE_URL}/v1/cr`, {
       ...requestOptions,
        headers: {
          ...headers
        },
        body: JSON.stringify(companyData),
      }).then(handleResponse)
      .catch(handleError);
    }; 

    const verifyEmail = (email) => { 
      return fetch(`${BASE_URL}/v1/company/email/${email}`, {
         ...requestOptions,
         method:'GET',
          headers: {
            ...headers
          },
        }).then(handleResponse)
        .catch(handleError);
      }; 

      const getCompanyList = (email) => { 
        return fetch(`${BASE_URL}/v1/company/all`, {
           ...requestOptions,
           method:'GET',
            headers: {
              ...headers
            },
          }).then(handleResponse)
          .catch(handleError);
        }; 

export const companyApiProvider = {
  signUp,
  resendOTP,
  verifyOTP,
  submitCompany,
  verifyEmail,
  createCompanyRelationship,
  getCompanyList
};
