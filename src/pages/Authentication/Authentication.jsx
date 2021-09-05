import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ReactPhoneInput from "react-phone-input-material-ui";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TCAP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Authentication() {
  const classes = useStyles();
  const [phone, setPhone] = useState("");
  const [verifyOtpButton, setVerifyOtpButton] = useState(false);

  const getVerificationOtp = async () => {
    let formData = {
      email: "test@trustless.capital",
      phoneNumber: "+911234567890",
    };
    // formData.append("email", "test@trustless.capital");
    // formData.append("phoneNumber", "+911234567890");
    const response = await fetch("http://18.118.12.136/api/user/signup", {
      method: "post",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    setVerifyOtpButton(true);
  };
  const verifyOTP = async () => {
    let formData = new FormData();
    formData.append("email", "test@trustless.capital");
    formData.append("phoneNumber", "+911234567890");
    const response = await fetch("http://18.118.12.136/api/user/verifyOTP", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@trustless.capital",
        phoneNumber: "+911234567890",
        otp: "2232",
      }),
    });
    console.log(response);
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
          />
          <ReactPhoneInput
            defaultCountry={"us"}
            value={phone}
            onChange={() => setPhone(phone)}
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
