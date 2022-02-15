//company api's
// import axios from 'axios'; // may be used in future
import { handleResponse, handleError } from "services/api/utlities/response";

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = process.env.REACT_APP_BASE_URL; //based on env
console.log(BASE_URL);
// const clientToken =
//   window.localStorage.getItem('utoken') ||
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMTUwYzNmLTQ1MWMtNDUzMC1hMjQ4LWUxNGQwNTdkMzBjOCIsImVtYWlsIjoicGFydGhkYWxhbDA2QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzkxNzAzMDIwNzg5NyIsInN0YXR1cyI6ImFjdGl2ZSIsImlzUGhvbmVWZXJpZmllZCI6ZmFsc2UsImlzRW1haWxWZXJpZmllZCI6dHJ1ZSwiaXNNbmVtb25pY0NyZWF0ZWQiOmZhbHNlLCJpc0FjY291bnRVbmxvY2tlZCI6ZmFsc2UsImxhc3RMb2dpbkF0IjoiMjAyMS0xMC0xNVQxNTo1NDozNy4wMDBaIiwid2FsbGV0QWRkcmVzcyI6bnVsbCwicHJpdmF0ZUtleUFkZHJlc3MiOm51bGwsImZ1dHVyZUFkZHJlc3MiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTVUMTU6NTQ6MzYuODQxWiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTVUMTY6Mzc6NTEuMDAwWiIsInVzZXJUeXBlIjoiaW52ZXN0b3IiLCJpYXQiOjE2MzQ4ODYyMjl9.A-6AdTd6IgZcZom0i2PuoBxIjBBVt5_eNsq8Zc4CNcE';

const clientToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMTUwYzNmLTQ1MWMtNDUzMC1hMjQ4LWUxNGQwNTdkMzBjOCIsImVtYWlsIjoicGFydGhkYWxhbDA2QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzkxNzAzMDIwNzg5NyIsInN0YXR1cyI6ImFjdGl2ZSIsImlzUGhvbmVWZXJpZmllZCI6ZmFsc2UsImlzRW1haWxWZXJpZmllZCI6dHJ1ZSwiaXNNbmVtb25pY0NyZWF0ZWQiOmZhbHNlLCJpc0FjY291bnRVbmxvY2tlZCI6ZmFsc2UsImxhc3RMb2dpbkF0IjoiMjAyMS0xMC0xNVQxNTo1NDozNy4wMDBaIiwid2FsbGV0QWRkcmVzcyI6bnVsbCwicHJpdmF0ZUtleUFkZHJlc3MiOm51bGwsImZ1dHVyZUFkZHJlc3MiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTVUMTU6NTQ6MzYuODQxWiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTVUMTY6Mzc6NTEuMDAwWiIsInVzZXJUeXBlIjoiaW52ZXN0b3IiLCJpYXQiOjE2MzQ4ODYyMjl9.A-6AdTd6IgZcZom0i2PuoBxIjBBVt5_eNsq8Zc4CNcE";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + clientToken,
};

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
      ...headers,
    },
    body: JSON.stringify(companyData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const addNewUser = (userData) => {
  userData.phoneNumber = `+${userData.phoneNumber}`;
  return fetch(`${BASE_URL}/api/user/add`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(userData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const createCompanyRelationship = (companyData) => {
  companyData.vendorContact = `+${companyData.vendorContact}`;
  companyData.anchorContact = `+${companyData.anchorContact}`;
  return fetch(`${BASE_URL}/v1/cr`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(companyData),
  })
    .then(handleResponse)
    .catch(handleError);
};
const uploadInvoiceDetails = (invoiceDetails) => {
  return fetch(`${BASE_URL}/v1/invoice`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(invoiceDetails),
  })
    .then(handleResponse)
    .catch(handleError);
};

const verifyEmail = (email) => {
  console.log("Headers", headers);
  console.log("Email", email);

  return fetch(`${BASE_URL}/v1/company/email/${email}`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

const getCompanyList = (email) => {
  return fetch(`${BASE_URL}/v1/company/all`, {
    ...requestOptions, ////v1/cr/vendor/:email
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
const getVendorRelationships = (email) => {
  return fetch(`${BASE_URL}/v1/cr/vendor/${email}`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
const getAnchorRelationships = (email) => {
  return fetch(`${BASE_URL}/v1/cr/anchor/${email}`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
const getVendorInvoices = (vendorId) => {
  return fetch(`${BASE_URL}/v1/invoice/vendor/${vendorId}`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

const getInvoiceEvidence = (invoiceEvidenceId) => {
  return fetch(`${BASE_URL}/document/evidence/${invoiceEvidenceId}`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

const getAllInvoices = () => {
  return fetch(`${BASE_URL}/v1/invoice/all`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
const addToMarketplace = (invoiceData) => {
  return fetch(`${BASE_URL}/v1/mp/issue`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(invoiceData),
  })
    .then(handleResponse)
    .catch(handleError);
};

const verifyInvoice = (invoiceData) => {
  return fetch(`${BASE_URL}/v1/invoice/verify`, {
    ...requestOptions,
    method: "PUT",
    headers: {
      ...headers,
    },
    body: JSON.stringify(invoiceData),
  })
    .then(handleResponse)
    .catch(handleError);
};
const getInvestorBalance = (
  walletAddress = "0xfE0839635FF2e05F99Fd6b0938120dA22Da1FA0C"
) => {
  return fetch(`${BASE_URL}/v1/mp/balances/${walletAddress}`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
const getInvestmentHistory = (
  walletAddress = "0xfE0839635FF2e05F99Fd6b0938120dA22Da1FA0C"
) => {
  return fetch(`${BASE_URL}/v1/mp/investments/${walletAddress}`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
const investMoney = (investData) => {
  return fetch(`${BASE_URL}/v1/mp/invest`, {
    ...requestOptions,
    headers: {
      ...headers,
    },
    body: JSON.stringify(investData),
  })
    .then(handleResponse)
    .catch(handleError);
};
const getAllDeals = () => {
  return fetch(`${BASE_URL}/v1/mp/open/deals`, {
    ...requestOptions,
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const companyApiProvider = {
  signUp,
  resendOTP,
  verifyOTP,
  submitCompany,
  verifyEmail,
  createCompanyRelationship,
  getCompanyList,
  uploadInvoiceDetails,
  getVendorRelationships,
  getAnchorRelationships,
  getVendorInvoices,
  getAllInvoices,
  addToMarketplace,
  getInvestorBalance,
  investMoney,
  getAllDeals,
  getInvoiceEvidence,
  verifyInvoice,
  getInvestmentHistory,
  addNewUser,
};
