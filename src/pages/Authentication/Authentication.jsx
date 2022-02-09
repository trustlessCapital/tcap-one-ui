import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MDBInput } from 'mdb-react-ui-kit';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PhoneInput from 'react-phone-input-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import validator from 'validator'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userApiProvider } from 'services/api/user/userService';
import 'react-phone-input-2/lib/bootstrap.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.trustless.capital/">
        TCAP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Authentication({ setToken }) {
  let history = useHistory();
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  const [verifyOtpButton, setVerifyOtpButton] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(validator.isEmail(email) && phone.trim().length == 12)
  }, [email, phone]);

  const getVerificationOtp = async (event) => {
    console.log(event);

    if (!email.trim().length || !phone.trim().length) {
      return;
    }

    let formData = {
      email: email,
      phoneNumber: `+${phone}`,
    };
    const response = await userApiProvider.login(formData);
    const loginData = await response;
    console.log('signup response', loginData);
      
    if(!loginData.isEmailVerified ||  !loginData.isPhoneVerified){
      alert('email and phone number needs to be verified');
    }
    else if(!loginData.email){
      alert('Account doesnt exist or something went wrong please try again');
    }
    else{
      setVerifyOtpButton(true);
    }
  };

  const verifyOTP = async () => {
    let formData = {
      email: email,
      phoneNumber: `+${phone}`,
      otp: otp,
    };

    const response = await userApiProvider.verifyOTP(formData);
    const userData = await response;

    console.log('verifyOTP response', userData);
   
    if(userData.jwt_token){
      window.localStorage.setItem('utoken', userData.jwt_token);
      window.localStorage.setItem('userData', JSON.stringify(userData));
      setToken({
        user: userData.email,
        type: userData.userType,
        utoken: userData.jwt_token,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          TCAP ONE
        </Typography>
        <form className={classes.form} noValidate>
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          /> */}
          <MDBInput 
            label='Email Address'
            id='typeEmail'
            type='email'
            size='lg'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {/* <ReactPhoneInput
            defaultCountry={"us"}
            value={phone}
            onChange={(value) => setPhone(value)}
            inputClass={classes.field}
            dropdownClass={classes.countryList}
            component={TextField}
          /> */}
          <br></br>
          <PhoneInput
            country={'in'}
            value={phone}
            onChange={(value) => {setPhone(value)}}
            required="true"
            inputStyle={{ width: '100%' }}
          />
          <br></br>
          {verifyOtpButton && (
            <MDBInput
              label='OTP'
              id='otp'
              type='number' 
              size='md'
              onChange={(event) => setOtp(event.target.value)}
            />
          )}

          {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="OTP"
              label="OTP"
              type="number"
              id="otp"
              onChange={(event) => setOtp(event.target.value)}
            /> */}


          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {!verifyOtpButton && (
            <Button
              disabled={!formIsValid}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={getVerificationOtp}
            >
              Get OTP
            </Button>
          )}
          {verifyOtpButton && (
            <Button
              disabled={!formIsValid}
              onClick={verifyOTP}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Verify OTP
            </Button>
          )}
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
          {
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          }
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
Authentication.propTypes = {
  setToken: PropTypes.func.isRequired,
};
