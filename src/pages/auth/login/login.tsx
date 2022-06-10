import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { json } from "stream/consumers";
import {  useHistory } from "react-router-dom";
import { Card } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { maxWidth } from "@mui/system";



type mytypes = {
  password: string;
  email: string;
  name: string;
};

export default function Login({}) {
  
  const history = useHistory()
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState();

  // const { handleSubmit } = useForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({

    mode: "onChange",
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const theme = createTheme();

  // console.log(formData)

  /*
   * Verify Credentials
   */
  const doLogin = (data: any, e: any) => {
    // setButtonDisabled(true);
    console.log("hii");

    authenticationService
      .verifyCredentials(data)
      .then((response: any) => {
        localStorage.setItem("data", JSON.stringify(data));
        setButtonDisabled(false);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });

    // authenticationService
    //   .verifyCredentials(formData)
    //   .then((response: any) => {
    //     setButtonDisabled(false);
    //   })
    //   .catch((error) => {
    //     setButtonDisabled(false);
    //   });
  };

  /*
   * Render

   */
  return (
    <Card
      sx={{
        maxWidth: "512px",
        boxShadow: "6px 6px 43px 8px rgba(33, 43, 54, 0.2)",
      }}
      className="outerDiv"
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "24px",
                margin: "24px 0 15px 0",
              }}
              component="h1"
              variant="h5"
            >
              Sign in to Social Feed
            </Typography>
            <Box
              component="form"
              // onSubmit={() => handleSubmit(doLogin)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{
                  width: "480px",
                  maxHeight: "48px",
                  margin: "24px 0 24px 0",
                }}
                // size={"small"}
                margin="normal"
                required
                fullWidth
                defaultValue="navanath@angularminds.com"
                id="email"
                {...register("email", {
                  required: "please enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              <TextField
                sx={{
                  maxWidth: "480px",
                  height: "48px",
                  margin: "24px 0 24px 0",
                }}
                margin="normal"
                // size={"small"}
                required
                fullWidth
                label="Password"
                defaultValue="Pass"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "please enter your password",
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message: "invalid password",
                  },
                })}
                name="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <LoadingButton
                onClick={handleSubmit(doLogin)}
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  
                  maxWidth: "480px",
                  height: "48px",
                  backgroundColor: "#1890FF",
                }}
                loading={isButtonDisabled}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  {/* <Link
                    onClick={() => {
                      return history.push("/auth/forgotpassword");
                    }}
                    variant="body2"
                  >
                   
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link
                    sx={{
                      fontSize: "16px",
                      marginRight:"16px",
                      color: "#637381",
                      textDecoration: "none",
                    }}
                    href="/auth/signup"
                    variant="body2"
                  >
                    {" Forgot password ?"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  marginTop={"32px"}
                  sx={{
                    fontSize: "16px",
                    color: "#637381",
                    textDecoration: "none",
                  }}
                  item
                  xs
                >
                  {" Don't have an account? "}
                  <Link
                    sx={{ textDecoration: "none" }}
                    onClick={() => {
                      return history.push("/auth/forgotpassword");
                    }}
                    variant="body2"
                  >
                    Sign Up
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="/auth/signup" variant="body2">
                    {" Forgot password ?"}
                  </Link> */}
                </Grid>
              </Grid>
              <div
                style={{
                  width: "100%",
                  height: "13px",
                  margin: "32px 0 32px 0",
                  borderBottom: "1px solid #919EAB"
,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: " 14px",
                    color: "#637381",
                    backgroundColor: " #ffffff",
                    padding: " 0 10px",
                  }}
                >
                  OR
                </span>
              </div>
              <div style={{ marginLeft: "30%", marginRight: "auto" }}>
                <GoogleLogin
                // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                // onSuccess={responseGoogle}
                // isSignedIn={true}
                />
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Card>
  );
}
