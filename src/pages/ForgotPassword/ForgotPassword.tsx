import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../utils/auth.service";
import { showErrorToast,showSuccessToast } from "../../utils/toastUtil";


function ForgotPassword() {
    
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
      email: "",
    },
  });
    
    const sentMail = (email:any) => {
        
        try {
            authenticationService
              .forgotPassword(email)
              .then((res) =>showSuccessToast("Email sent successfully!") )
              .catch((error) => {setError('email', { type: 'custom', message: error.message }) ; showErrorToast(error.message)});
        } catch (error) {
            console.log("catch")
        }

    }
    
    
    
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          margin: "100px 35% 0 35%",
          border: "4px solid #d9d9d9",
          padding: "30px",
          borderRadius: "5px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography fontSize={25} sx={{color:"#2e2e2d", fontFamily:"sans-serif"}}>Forgot Password</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography fontSize={25} sx={{ color: "gray", fontFamily: "sans-serif",fontSize:'12px' }}>Please enter email address associated with your account, and will email you a link to reset password</Typography>
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
                placeholder="Enter your email address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
            />
            
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
              variant="contained"
              fullWidth
                sx={{ height: "55px" }}
                onClick={handleSubmit(sentMail)}
              >
                Send
              </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="text"
              fullWidth
              type="button"
              sx={{ height: "55px" }}
              href='/auth/login'
              // onClick={handleSubmit(sentMail)}
            >
              Back
            </Button>
          </Grid>
          
          
        </Grid>
      </Box>
    </>
  );
}

export default ForgotPassword;
