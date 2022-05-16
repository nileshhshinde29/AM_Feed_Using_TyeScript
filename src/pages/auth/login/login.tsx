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

type mytypes = {
  password: string;
  email: string;
  name: string;
};

export default function Login({}) {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={() => handleSubmit(doLogin)}
            noValidate
            sx={{ mt: 1 }}
          >
              <TextField
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              <TextField
                margin="normal"
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
                    value:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message: "invalid password",
                  },
                })}
                name="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                onClick={handleSubmit(doLogin)}
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isButtonDisabled}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link href='/auth/signup' variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
