import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PhoneInput from 'react-phone-input-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { userApiProvider } from 'services/api/user/userService';
import { useHistory } from 'react-router-dom';
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

export default function Signup({ setToken }) {
  const history = useHistory();
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  const [verifyOtpButton, setVerifyOtpButton] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('investor');

  const getVerificationOtp = async (event) => {
    if (!email.trim().length || !phone.trim().length) {
      return;
    }

    let formData = {
      email: email,
      phoneNumber: `+${phone}`,
      userType,
    };

    console.log(formData);
    const response = await userApiProvider.signup(formData);
    const signupData = await response;
    if(signupData.id){
    console.log('signup response', signupData);
    setVerifyOtpButton(true);
  }
  else{
    alert('User Already exist ro something went wrong! please try again.')
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
    window.localStorage.setItem('utoken', userData.jwt_token);
    window.localStorage.setItem('userData', JSON.stringify(userData));
    setToken({
      user: userData.email,
      type: userData.userType,
      utoken: userData.jwt_token,
    });
    history.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New to TCAP ONE?
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
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
          />
          {/* <ReactPhoneInput
            defaultCountry={"in"}
            value={phone}
            onChange={(value) => setPhone(value)}
            inputClass={classes.field}
            dropdownClass={classes.countryList}
            component={TextField}
          /> */}
          <PhoneInput
            country={'in'}
            value={phone}
            onChange={(value) => setPhone(value)}
            required="true"
            inputStyle={{ width: '100%' }}
          />
          <br></br>
          <FormLabel component="legend">Signup Type</FormLabel>
          <RadioGroup
            row
            aria-label="userType"
            name="user-type-radio-buttons-group"
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
          >
            <FormControlLabel
              value="investor"
              control={<Radio />}
              label="Investor"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Company"
            />
          </RadioGroup>
          {verifyOtpButton && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="OTP"
              label="OTP"
              type="number"
              id="otp"
              onChange={(event) => setOtp(event.target.value)}
            />
          )}
          {!verifyOtpButton && (
            <Button
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
              onClick={verifyOTP}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Verify OTP
            </Button>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
