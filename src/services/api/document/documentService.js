//company api's
// import axios from 'axios'; // may be used in future
import { handleResponse, handleError } from 'services/api/utlities/response'; 

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = process.env.REACT_APP_BASE_URL; //based on env
console.log(BASE_URL);
const clientToken = window.localStorage.getItem('utoken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMTUwYzNmLTQ1MWMtNDUzMC1hMjQ4LWUxNGQwNTdkMzBjOCIsImVtYWlsIjoicGFydGhkYWxhbDA2QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzkxNzAzMDIwNzg5NyIsInN0YXR1cyI6ImFjdGl2ZSIsImlzUGhvbmVWZXJpZmllZCI6ZmFsc2UsImlzRW1haWxWZXJpZmllZCI6dHJ1ZSwiaXNNbmVtb25pY0NyZWF0ZWQiOmZhbHNlLCJpc0FjY291bnRVbmxvY2tlZCI6ZmFsc2UsImxhc3RMb2dpbkF0IjoiMjAyMS0xMC0xNVQxNTo1NDozNy4wMDBaIiwid2FsbGV0QWRkcmVzcyI6bnVsbCwicHJpdmF0ZUtleUFkZHJlc3MiOm51bGwsImZ1dHVyZUFkZHJlc3MiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTVUMTU6NTQ6MzYuODQxWiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTVUMTY6Mzc6NTEuMDAwWiIsInVzZXJUeXBlIjoiaW52ZXN0b3IiLCJpYXQiOjE2MzQ4ODYyMjl9.A-6AdTd6IgZcZom0i2PuoBxIjBBVt5_eNsq8Zc4CNcE';
const headers = {
  'Authorization': 'Bearer ' + clientToken,
}

var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

          const submitDocuments = (documentFormData) => { 
            return fetch(`${BASE_URL}/document/upload`, {
               ...requestOptions,
                headers: {
                  ...headers
                },
                body:documentFormData
              }).then(handleResponse)
              .catch(handleError);
            }; 
            const updateDocumentsToServer = (documentData) => { 
              return fetch(`${BASE_URL}/document/update`, {
                 ...requestOptions,
                  headers: {
                    ...headers,
                    "Content-Type":'application/json'
                  },
                  body: JSON.stringify(documentData),
                }).then(handleResponse)
                .catch(handleError);
              }; 
        


export const documentApiProvider = { 
  submitDocuments,
  updateDocumentsToServer
};