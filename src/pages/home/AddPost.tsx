import * as React from "react";
import Card from "@mui/material/Card";
import { Box, Button, Grid, TextField } from "@mui/material";

import { type } from "@testing-library/user-event/dist/type";
import {authenticationService} from "../../utils/auth.service"
import { useForm } from "react-hook-form";


type my = {
  image: any;
  caption: string;
};

 function AddPost(props:my) {

     const formData= new FormData()

    const [postData, setPostData] = React.useState({
      image: [],
      caption: "",
    });

  
     const AddPostFun = () => {
         formData.append("image", postData.image)
         formData.append("caption", postData.caption)
         console.log(formData)
         
        //  authenticationService.AddPost(formData)
        //      .then(
        //          () => {
        //              formData.delete("image")
        //              formData.delete("caption")
        //          }
        //  )
     }
     
     

  return (
    <Card sx={{ minWidth:600 }}>
      <Box
      sx={{
        margin: "10px",
        padding: "30px",
        borderRadius: "5px",
      }}
      >
        <h4>ADD POST</h4>

        <br />
        <Grid container spacing={2}>
          <Grid item container xs={12} md={12} lg={6} xl={6}>
            <input
              type="file"
              multiple
              onChange={(e:any) => setPostData( {...postData , image:[...postData.image , ...e.target.files]})}
            />
            
          </Grid>
          <Grid item container xs={12} md={12} lg={6} xl={6} spacing={2}>
            <TextField
              required
              fullWidth
              id="caption"
              onChange={(e)=>setPostData({...postData,caption:e.target.value})}
              label="Caption"
              name="caption"
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid>
          <Button onClick={()=>AddPostFun()}>ADD</Button>
        </Grid>
      </Box>
    </Card>
  );
}

export default AddPost;
