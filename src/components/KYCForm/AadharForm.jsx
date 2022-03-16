import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { FormControl, FormHelperText, Button } from '@material-ui/core';
import { useForm } from "react-hook-form"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function AadharForm({ updateKYCStatus }) {
  const classes = useStyles();
  const [ response, setResponse ] = React.useState({
    data: null,
    error: null,
    loading: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const fetchDetails = (data) => {
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: null,
    }))
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "xvskncotgq0p4aqpdc8i9fh155dot7ki");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };

    fetch("https://api.kyckart.com/api/aadhaar/extraction", requestOptions)
      .then(response => response.json())
      .then(({response}) => {
        if (response.code === 404 ) {
          setResponse((prev) => ({
            ...prev,
            loading: false,
            error: response,
            data: null,
          }))
          updateKYCStatus(false)
        } else {
          setResponse((prev) => ({
            ...prev,
            loading: false,
            error: null,
            data: response,
          }))
          updateKYCStatus(true)
        }
      })
      .catch(error => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          data: null,
          error: error,
        }))
        updateKYCStatus(false)
      });
  }

  const onSubmit = (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value[0], value[0]['name']);
    })
    fetchDetails(formData)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin='dense'>
          <Typography
            variant='button'
            component="label"
            htmlFor="front-image"
            children="Front Image"
          />
          <input
            id="front-image"
            type="file"
            {...register("front", { required: true})}
          />
          {errors?.front?.type === "required" && (
            <FormHelperText
              children="This field is required"
              error={true}
            />
          )}
        </FormControl>
        <FormControl fullWidth margin='dense'>
          <Typography
            variant='button'
            component="label"
            htmlFor="back-image"
            children="Back Image"
          />
          <input
            id="back-image"
            type="file"
            {...register("back", { required: true})}
          />
          {errors?.back?.type === "required" && (
            <FormHelperText
              children="This field is required"
              error={true}
            />
          )}
        </FormControl>
        <Button type='submit' variant="contained" color="primary">Submit</Button>
      </form>
      {response.loading && (<CircularProgress color="inherit" />)}
      {response.data && response.data && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {Object.entries(response.data).map(([key, value]) => (
                <Fragment key={key}>
                  {
                    (typeof value === 'string') && (
                      <TableRow>
                        <TableCell scope="row">
                          {key}
                        </TableCell>
                        <TableCell>
                          {value}
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
  </>);
}

export default AadharForm;
