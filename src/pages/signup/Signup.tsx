import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { padding } from "@mui/system";
import { authenticationService } from "../../utils/auth.service";
import { Height } from "@mui/icons-material";

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

export default function FullWidthGrid() {
  const [error, setError] = React.useState("");

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
      firstname: "",
      lastname: "",
    },
  });


  const sendVerificationMail = (token: any) => {
    console.log(token)

    authenticationService.sendVerification(token)

  }


  // signup function triger on submmit button

  const Signup = (data: any) => {
    authenticationService
      .register(data)
      .then((response) => {
        console.log(response);

        // sendVerificationMail(response.token)

      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          margin: "100px 30% 0 30%",
          border: "4px solid #d9d9d9",
          padding: "30px",
          borderRadius: "5px",
        }}
      >
        <h4>Sign up</h4>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <TextField
              required
              fullWidth
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
              helperText={errors.firstname?.message}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6} xl={6}>
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
              helperText={errors.lastname?.message}
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
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
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
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <p style={{ color: "red", backgroundColor: "#FFD2D2" }}>{error}</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button onClick={handleSubmit(Signup)}> Submit</Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button href="/auth/login">go to login page</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
