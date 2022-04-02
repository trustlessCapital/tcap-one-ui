import {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, Grid, CircularProgress}  from '@material-ui/core';
import CashFlowBuckets from './CashFlowBuckets';
import FinancedReceivables from './FinancedReceivables'
import EntityOnboarding from './EntityOnboarding';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: '100%',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function ArrangerDashboard({userData}) {
  const classes = useStyles();
  const { firstName, lastName, walletAddress } = userData
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const currencyFormat = (amount) => new Intl
    .NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'code',
      maximumFractionDigits: 2, 
      minimumFractionDigits: 0,
    }).format(amount)

  const fetchDetails = (walletAddress) => {
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: null,
    }))

    fetch(process.env.REACT_APP_BASE_URL + '/v1/mp/arranger/' + walletAddress)
      .then(response => response.json())
      .then((response) => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: null,
          data: response,
        }))
      })
      .catch(error => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          data: null,
          error: error,
        }))
      });
  }

  useEffect(() => {
    if (walletAddress) {
      fetchDetails(walletAddress)
    }
  }, [walletAddress])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="p">
              Hi&nbsp;{firstName}&nbsp;{lastName},
              <br />
              Welcome to TCAP One Platform to Manage your Entities & Investments
            </Typography>
          </Paper>
        </Grid>
        {/* Total Investment */}
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="p">
              Total Investment YTD
            </Typography>
            {response.loading && (<CircularProgress color="inherit" />)}
            {response.data && (
              <Typography variant="h5" component="p" style={{ textAlign: "center" }}>
                {
                  currencyFormat(response.data.reduce((sum, item) => Number(item.debtAmount) + (sum || 0), 0))
                }
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <EntityOnboarding />
          </Paper>
        </Grid>

        {/* Cash Flow Buckets */}
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="div">
              Financed Receivables
            </Typography>
            {response.loading && (<CircularProgress color="inherit" />)}
            {response.data && (
              <FinancedReceivables data={response.data} currencyFormat={currencyFormat}/>
            )}
          </Paper>
        </Grid>

        {/* Cash Flow Buckets */}
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="div">
              Cashflow Buckets
            </Typography>
            {response.loading && (<CircularProgress color="inherit" />)}
            {response.data && <CashFlowBuckets data={response.data}/>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ArrangerDashboard