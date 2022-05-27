import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../utils/auth.service";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtil";
import { useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function ResetPassword() {

    

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
        confirmPassword:"",
    },
  });
    
    const { search } = useLocation()
    const token = search?.split("=")[1];

    console.log(token.length)

  
  //* reset password function  
    const Reset = (data :any) => {
       
        if (data.password === data.confirmPassword) {

              authenticationService.requestPasswordReset({token:token , obj:{password:data.password}})

        } else {
          setError("confirmPassword", {
            type: "custom",
            message: "password must match",
          });
        }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          margin: "100px 30% 0 30%",
          border: "4px solid #d9d9d9",
          padding: "30px",
          borderRadius: "5px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Typography
              fontSize={25}
              sx={{ color: "#2e2e2d", fontFamily: "sans-serif" }}
            >
              Reset Password
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} >
            <TextField
              required
              fullWidth
              label="New Password"
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
            <TextField
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              {...register("confirmPassword", {
                required: "please confirm your password",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message: "invalid password",
                    
                },
              })}
              name="confirmPassword"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>

          <Grid item container >
            <Grid item xs={12} md={6}>
              <Button onClick={handleSubmit(Reset)}>Submit</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button href="/auth/login">go to login page</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ResetPassword;
