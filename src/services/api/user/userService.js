//company api's
// import axios from 'axios'; // may be used in future
import { handleResponse, handleError } from "services/api/utlities/response";

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL =
  "https://eoql7b7hs2.execute-api.us-east-2.amazonaws.com/dev/api";
const headers = {
  "Content-Type": "application/json",
};
var requestOptions = {
  method: "POST",
  redirect: "follow",
};
/** @param {object} signupData */
const signUp = (signupData) => {
  return fetch(`${BASE_URL}/user/signup`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const login = (loginData) => {
  return fetch(`${BASE_URL}/user/login`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(loginData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const verifyOTP = (otpData) => {
  return fetch(`${BASE_URL}/user/otp`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(otpData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const signup = (signupData) => {
  return fetch(`${BASE_URL}/user/signup`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(signupData),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const userApiProvider = {
  signUp,
  login,
  verifyOTP,
  signup,
};
