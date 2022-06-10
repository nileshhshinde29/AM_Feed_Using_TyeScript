import { Box, Button, IconButton, makeStyles, Stack } from '@mui/material';
import React, { useState } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
// import "./home.scss";
// import { styled } from "@mui/material/styles";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// // import "./home.scss";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


import { height } from '@mui/system';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function DisplayImages(props) {

  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props?.images?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  const [page, setPage] = useState(0)
  const [showImages, setShowImages] = useState(false)


  const deleteImagesFromArray = (index :any) => {
    
    const data = props?.images?.filter((items, ind) => index !== ind)
    props.setPostData(prv=>({...prv ,image:data}))
    setActiveStep(0)

  };

 

  return (
    <>
      <Box className="container1" sx={{ position: "relative" }}>
        <Stack
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Stack>
            <IconButton>
              <ArrowBackIcon onClick={()=>props.setBack(true) } />
           </IconButton>
          </Stack>
          <Stack>
            <Button onClick={() => props.setNext((prv) => !prv)}>Next</Button>
          </Stack>
        </Stack>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          autoplay={false}
          enableMouseEvents
        >
          {props?.images?.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 470,
                    display: "block",
                    maxWidth: "500px",
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={URL.createObjectURL(step)}
                  alt={step.label}
                />
                // <Box>
                //   <img src={URL.createObjectURL(step)} height="470px" width="500px" />
                // </Box>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          className="btn"
          steps={0}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft className="navButton" />
              ) : (
                <KeyboardArrowRight className="navButton" />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight className="navButton" />
              ) : (
                <KeyboardArrowLeft className="navButton" />
              )}
            </Button>
          }
        />
        <Box
          className="myImages"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {/* <MobileStepper
            sx={{
              backgroundColor: "transparent",
              color: "transparent",
            }}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
          /> */}
          {showImages && (
            <>
              <Stack
                position={"absolute"}
                display={"flex"}
                flexDirection={"row"}
                minWidth="480px"
                sx={{ background: "rgba(0, 0, 0, 0.5)", borderRadius: "10px" }}
                className='slider'
                
              >
                {props?.images
                  ?.slice(page * 4, page * 4 + 4)
                  ?.map((image, index) => (
                    <Box sx={{ position: "relative" }} key={image}>
                      <Box margin="10px">
                        <img
                          height={"100px"}
                          width="100px"
                          src={URL.createObjectURL(image)}
                          onClick={() => setActiveStep(index)}
                          
                        />
                      </Box>
                      <Box
                        sx={{
                          color: "white",
                          position: "absolute",
                          top: "10%",
                          left: "80%",
                          height: "12px",
                          width: "12px",
                          backgroundColor: "gray",
                          borderRadius: "12px",
                          fontSize: "10px",
                        }}
                        className="clickAnimation"
                        onClick={() => deleteImagesFromArray(index)}
                      >
                        x
                      </Box>
                    </Box>
                  ))}
                {page * 4 + 4 > props?.images?.length && (
                  <>
                    <Box
                      margin="10px"
                      height={"100px"}
                      width={"100px"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      // top={"50%"}
                      backgroundColor="white"
                    >
                      <input
                        style={{ display: "none" }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e: any) =>
                          // props.setPostData({
                          //   ...props.postData,
                          //   image: [...props.postData.image, ...e.target.files],
                          // })
                          props.setPostData(prv=>({...prv ,image:[...prv.image , ...e.target.files ]}))
                        }
                      />
                      {console.log(props.images)}
                      <label htmlFor="contained-button-file">
                        <AddAPhotoOutlinedIcon sx={{ color: "black" }} />
                      </label>

                      {/* <
                    height={"100px"}
                    width="100px"
                  
                  /> */}
                    </Box>
                  </>
                )}
              </Stack>
              <Stack
                width="110%"
                display={"flex"}
                flexDirection="row"
                justifyContent={"space-between"}
              >
                <Box>
                  <Button
                    sx={{
                      backgroundColor: "white",
                      height: "20px",
                      minWidth: "20px",
                      padding: "0",
                      borderRadius: "20px",
                    }}
                    disabled={page < 1}
                    className="clickAnimation"
                    onClick={() => setPage(page - 1)}
                  >
                    {"<"}
                  </Button>
                </Box>
                <Box>
                  <Button
                    sx={{
                      backgroundColor: "white",
                      height: "20px",
                      minWidth: "20px",
                      padding: "0",
                      borderRadius: "20px",
                    }}
                    disabled={page > 0}
                    className="clickAnimation"
                    onClick={() => setPage(page + 1)}
                  >
                    {">"}
                  </Button>
                </Box>
              </Stack>
            </>
          )}
        </Box>
        <Stack
          className="myImages clickAnimation"

          sx={{ top: "92%", left: "92%", minWidth: "30px",backgroundColor:"gray" ,height:"30px", width:"30px"  }}
        >
         
          <IconButton sx={{ minWidth: "30px", backgroundColor: "gray", height: "40px", width: "40px", borderRadius: "40px" }}>
            <PhotoLibraryIcon onClick={() => setShowImages(!showImages)}  />
          </IconButton>
        </Stack>

        {/* <Stack position={"absolute"} display={"flex"} flexDirection={"row"}>
          {props.images.map((image, index) => 
            <Box>
            
            <img height={"40px"} width="40px  " src={URL.createObjectURL(image)} />
          </Box>
          )}  
        </Stack> */}
      </Box>
    </>
  );
}

export default DisplayImages