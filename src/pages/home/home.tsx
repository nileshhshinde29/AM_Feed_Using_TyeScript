import React from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddPost from "./AddPost";

export default function Login() {
  
  return (
    <Container maxWidth="xs">
      <AddPost/>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
      </Box>
    </Container>
  );
}
