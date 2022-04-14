import React, {useEffect, useState, Fragment} from 'react'
import {Typography} from '@material-ui/core'
import { useParams, Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
});

const currencyFormat = (amount) => new Intl
  .NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    maximumFractionDigits: 2, 
    minimumFractionDigits: 0,
  }).format(amount)

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(date * 1000)
}

const RenderValue = ({name, value}) => {
  if (name === "Loan Amount") {
    return currencyFormat(value)
  }

  if (name === "Issue Date") {
    return formatDate(value)
  }

  if (name === "celoTxHash") {
    return <Link to={`https://polygonscan.com/tx/${value}`}>{value}</Link>
  }

  return value
}

function FinancedReceivableDetail() {
  const classes = useStyles();
  const { address } = useParams();
  const { walletAddress } = JSON.parse(localStorage.getItem('userData'));
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const fetchDetails = async (walletAddress, address) => {
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: null,
    }))
    
    try {
      let result = {};
      const request = await fetch(process.env.REACT_APP_BASE_URL + '/v1/mp/arranger/' + walletAddress)
      const response = await request.json()
      const data = response.find((item) => item.borrowerAddress === address)
      if (data) {
        result = { ...data }
        // Borrower Data
        const borrowerRequest = await fetch(process.env.REACT_APP_BASE_URL + '/api/user/accountbyaddress/' + data.borrowerAddress)
        const borrowerResponse = await borrowerRequest.json()
        const browserDetailRequest = await fetch(process.env.REACT_APP_BASE_URL + '/v1/company/email/' + borrowerResponse.email)
        const browserDetailResponse = await browserDetailRequest.json()
        result.borrower = browserDetailResponse
        // Borrower Data

        const details = {
          "NFT Token Id": data.nftTokenId,
          "Borrower": data.borrower?.organisationName,
          "Loan Amount": data.debtAmount,
          "Status": data.status,
          "Issue Date": data.issueDate,
          "celoTxHash": data.celoTxHash
        }
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: null,
          data: details,
        })) 
      }
    } catch (error) {
      setResponse((prev) => ({
        ...prev,
        loading: false,
        data: null,
        error: error,
      }))
    }

  }

  
  useEffect(() => {
    if (walletAddress && address) {
      fetchDetails(walletAddress, address)
    }
  }, [walletAddress, address])

  return (
    <div>
      <Typography variant='h3' align="center">
        Total Investment YTD
      </Typography>
      {response.loading && (<CircularProgress color="inherit" />)}
      {response.data && response.data && (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableBody>
              {Object.entries(response.data).map(([name, value]) => (
                <Fragment key={name}>
                  {
                    (typeof value === 'string') && (
                      <TableRow>
                        <TableCell scope="row">
                          {name}
                        </TableCell>
                        <TableCell>
                          <RenderValue name={name} value={value}/>
                        </TableCell>
                      </TableRow>
                    )
                  }
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {response.error && (<MuiAlert severity="error">Something went wrong!</MuiAlert>)}
    </div>
  )
}

export default FinancedReceivableDetail