import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import back from "../../../Images/back.png"

function Back(props) {
  return (
    <Box
      height={"500px"}
      width={"500px"}
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Stack>
        <img src={back} />
      </Stack>
      <Stack>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => props.DiscardFunction()}
        >
          Discard process
        </Button>
        <Button onClick={() => props.setBack(false)}>Cancel</Button>
      </Stack>
      <Stack></Stack>
    </Box>
  );
}

export default Back