import { Stack } from "@mui/material";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import uploadImage from "../../../Images/uploadImage.jpg"

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop(props) {
  const [file, setFile] = useState([]);
  const handleChange = (file) => {
    props.setPostData(prv=>({...prv , image:[...prv.image ,...file]}))
  };

  console.log(file)
  return (
    <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
      <FileUploader
        handleChange={handleChange}
        multiple={true}
        label="upload file"
        name="file"
        type={fileTypes}
      >
        <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
       
            <img height={"250px"} width={"300px"} src={uploadImage} />

            <p style={{color:'gray' ,fontSize:"10px"}}>Drag Photo from device to upload</p>
         
        </Stack>
      </FileUploader>
    </Stack>
  );
}

export default DragDrop;
