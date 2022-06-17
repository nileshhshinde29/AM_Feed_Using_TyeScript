import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, FormControl, IconButton, InputLabel, Link, OutlinedInput, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { padding } from "@mui/system";
import { authenticationService } from "../../utils/auth.service";
import { Height, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import likesSmaily from "../../Images/likesSmaily.jpeg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from 'react-toastify';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';


import "../../App.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Provider {
  firstName: string;
  lastName: String;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export default function FullWidthGrid() {
   const [values, setValues] = React.useState<State>({
     amount: "",
     password: "",
     weight: "",
     weightRange: "",
     showPassword: false,
   });
  const [image, setImage] = useState([]);
  console.log(image);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      email: "",
      firstname: "",
      lastname: "",
    },
  });

  const sendVerificationMail = (token: any) => {
    authenticationService.sendVerification(token);
    toast('varification mail sent, check your mail & verify to continue')
    
  };

  // signup function triger on submmit button

  const Signup = (data: any) => {
    authenticationService
      .register(data)
      .then((response: any) => {
        sendVerificationMail(response.token);
      })
      .catch((err) => {
        setError("email", { type: "custom", message: err.message });
      });
  };

  // const handleChange =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //     setValue('password', event.target.value)
  //   };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <Paper
        sx={{
          boxShadow: "6px 6px 43px 8px rgba(33, 43, 54, 0.2)",
          // backgroundColor: "rgba(255, 255, 255, .15)",
          // flexGrow: 1,
          margin: "100px auto 0 auto",
          // border: "4px solid #d9d9d9",
          borderRadius: "8px",
          padding: "16px",
          // borderRadius: "5px",

          maxWidth: "512px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            margin: "24px auto 15px 22%",
          }}
          component="h1"
          variant="h5"
        >
          Sign up to Social Feed
        </Typography>

        <br />

        {/* <Grid item container xs={12} md={12} lg={6} xl={6}>
            <img src={likesSmaily} style={{width:"100%", height:"auto"}} />
          </Grid> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              required
              fullWidth
              // size="48px"
              sx={{ height: "48px" }}
              id="first_name"
              {...register("firstname", {
                required: "please enter name",
                // pattern: {
                //   // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   // message: "invalid email address",
                // },
              })}
              label="First Name"
              name="firstname"
              autoFocus
              error={Boolean(errors.firstname)}
              helperText={errors.firstname && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' />{' '} {errors.firstname?.message}</Stack>}

            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              required
              fullWidth
              id="last_Name"
              {...register("lastname", {
                required: "please enter name",
                // pattern: {
                //   // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   // message: "invalid email address",
                // },
              })}
              label="Last name"
              name="lastname"
              autoFocus
              error={Boolean(errors.lastname)}
              helperText={errors.lastname && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' />{' '} {errors.lastname?.message}</Stack>}

            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              fullWidth
              id="email"
              {...register("email", {
                required: "please enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              label="Email Id"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' /> {' '}{errors.email?.message}</Stack>}

            />
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <TextField
              required
              style={{ position: "relative" }}
              fullWidth
              label="Password"
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
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <VisibilityIcon style={{ position: "absolute" }} /> */}
            <FormControl   fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                // value={values.password}
                // onChange={handleChange("password")}
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"

                
              />
              <span style={{ marginLeft: '15px', fontSize: '12px', color: 'red' }}>{errors.password && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' />{ ' '} {errors.password?.message}</Stack>}</span>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#1890FF" }}
              onClick={handleSubmit(Signup)}
            >
              {" "}
              Submit
            </Button>
          </Grid>
          <Grid
            margin={"20px 0 20px 0"}
            sx={{
              fontSize: "16px",
              color: "#637381",
              textDecoration: "none",
            }}
            item
            xs
          >
            {"Already having an account? "}
            <Link sx={{ textDecoration: "none" }} href='/auth/login'  variant="body2">
              
              Sign in
            </Link>
          </Grid>

          {/* <Grid item xs={12} md={6}>
              <Button onClick={handleSubmit(Signup)}> Submit</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button href="/auth/login">go to login page</Button>
            </Grid> */}
        </Grid>
      </Paper>
    </div>
  );
}
