import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ReactPhoneInput from 'react-phone-input-material-ui';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import  {companyApiProvider} from 'services/api/company/companyService';
import  {userApiProvider}  from 'services/api/user/userService';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
  const [otp,setOtp] = useState('');
  const [email,setEmail] = useState('');

  const getVerificationOtp = async (event) => {
    console.log(event);
    let formData = {
      email: email,
      phoneNumber: `+${phone}`,
    };
    const response = await userApiProvider.signUp(formData);
    console.log("signup response",response.status);
    const otpReq = await companyApiProvider.resendOTP({email:formData.email});
    console.log("resend otp",otpReq);
    setVerifyOtpButton(true);
  };
  const verifyOTP = async () => {
    let formData = {
      email: email,
           otp: otp,
    }
    const response = companyApiProvider.verifyOTP(formData);
    console.log("verifyOTP",response);
    setToken({user:"investor1",type:"investor"});
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
          <ReactPhoneInput
            defaultCountry={'us'}
            value={phone}
            onChange={value => setPhone(value)}
            inputClass={classes.field}
            dropdownClass={classes.countryList}
            component={TextField}
          />
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
              onChange={(event)=>setOtp(event.target.value)}
            />
          )}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
