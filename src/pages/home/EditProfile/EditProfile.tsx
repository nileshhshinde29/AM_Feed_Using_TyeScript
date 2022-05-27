import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import { padding } from "@mui/system";
import { authenticationService }from "../../../utils/auth.service"
import { Height } from "@mui/icons-material";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
// import "../../App.css";

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
  bio: string;
  password: string;
  first_name: string;
  last_name: string;
}

export default function FullWidthGrid() {
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
      username:"",
      firstname: "",
      lastname: "",
    },
  });

  const sendVerificationMail = (token: any) => {
    // authenticationService.sendVerification(token);
  };

  // signup function triger on submmit button

  const Signup = (data: any) => {
    // authenticationService
    //   .register(data)
    //   .then((response: any) => {
    //     sendVerificationMail(response.token);
    //   })
    //   .catch((err) => {
    //     setError("email", { type: "custom", message: err.message });
    //   });
  };

  return (
    <div>
      <Box
        sx={{
          boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
          backgroundColor: "rgba(255, 255, 255, .15)",
          flexGrow: 1,
          height: "auto",
          margin: "100px 10% 0 10%",
          border: "4px solid #d9d9d9",
          padding: "30px",

          borderRadius: "5px",
        }}
      >
        <h4>Edit Profile</h4>

        <br />
        <Grid container spacing={2}>
          <Grid item container xs={12} md={12} lg={6} xl={6}>
            {/* <img src={likesSmaily} style={{ width: "100%", height: "auto" }} /> */}
          </Grid>
          <Grid item container xs={12} md={12} lg={6} xl={6} spacing={4}>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <TextField
                required
                fullWidth
                id="username"
                {...register("username", {
                  required: "please username name",
                  // pattern: {
                  //   // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   // message: "invalid email address",
                  // },
                })}
                label="username"
                name="username"
                autoFocus
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <TextareaAutosize
                required
                fullWidth
                id="bio"
                {...register("bio", {
                  required: "please enter bio",
                  // pattern: {
                  //   // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   // message: "invalid email address",
                  // },
                })}
                minRows={3}
                label="bio"
                name="bio"
                style={{ width: "100%" }}
                autoFocus
                error={Boolean(errors.bio)}
                helperText={errors.bio?.message}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth  sx={{border:"1px solid gray",borderRadius:"5px",padding:"5px"}}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                  <FormControlLabel
                    value="disabled"
                    disabled
                    control={<Radio />}
                    label="other"
                  />
                </RadioGroup>
              </FormControl>
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Date Of Birth"
                value={obj.dob}
                openTo="year"
                views={["year", "month", "day"]}
                // value={AllEmployeData.DOB}
                onChange={(newValue) => {
                  setObj({ ...obj, dob: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button onClick={handleSubmit(Signup)}> Submit</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button href="/auth/login">go to login page</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
