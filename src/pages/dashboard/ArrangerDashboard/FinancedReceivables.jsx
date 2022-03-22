import { useEffect, useState } from 'react'
import {Typography, CircularProgress}  from '@material-ui/core';

function FinancedReceivables({data, currencyFormat}) {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const fetchUserByAddress = async (reqs) => {
    const requests = reqs
      .map((item) => fetch(process.env.REACT_APP_BASE_URL + '/api/user/accountbyaddress/' + item.borrowerAddress).then((res) => res.json()))
    return await Promise.allSettled(requests)
  }

  const fetchCompanyByEmail = async (data) => {
    const requests = data
      .map((item) => {
        return item ? fetch(process.env.REACT_APP_BASE_URL + '/v1/company/email/' + item)
            .then((res) => res.json())
          : null
      })
    return await Promise.allSettled(requests)
  }



  useEffect(() => {
    const latestFinancedReceivables = data.filter((_, idx) => idx < 3)
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: null,
    }))
    fetchUserByAddress(latestFinancedReceivables)
      .then((res) => {
        const emailList = res.map((item) => item.status === 'fulfilled' ? item.value.email : null)
        return emailList
      })
      .then((res) => fetchCompanyByEmail(res))
      .then((res) => {
        const emailList = res.map((item) => item.status === 'fulfilled' ? item.value : null)
        return emailList
      })
      .then((res) => {
        return res.map((item, idx) => {
          if (item) {
            return ({
              name: item.organisationName,
              debtAmount: currencyFormat(latestFinancedReceivables[idx]?.debtAmount)
            })
          }
          return null
        })
      })
      .then((res) => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: null,
          data: res,
        }))
      })
      .catch((err) => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: err,
          data: null,
        }))
      })
      
  }, [])

  return (
    <div>
      {response.loading && (<CircularProgress color="inherit" />)}
      {response.data && response.data.map((item, index) => (
        <>
          { item &&
            <div
              style={{
                display: 'flex',
                gap: 15,
              }}
              key={index}
            >
              <Typography variant="body1" component="span"  style={{flex: 1}}>
                {item.name}
              </Typography>
              <Typography variant="body1" component="span"  style={{flex: 1}}>
                {item.debtAmount}
              </Typography>
            </div>
          }
        </>
      ))}
    </div>
  )
}

export default FinancedReceivables