import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, CardHeader, Divider, Grid, IconButton, Input, Stack, TextField, Typography } from "@mui/material";
// import "./Modal.scss";
import { Bookmark, FavoriteBorderOutlined, Image, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
//
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { autoPlay } from "react-swipeable-views-utils";
// import Likes from "./like/Likes";
// import { authenticationService } from "../../utils/auth.service";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import uploadImage from '../../../Images/uploadImage.jpg'
import DisplayImages from './DisplayImages'
import Caption from "./Caption";
import DragAndDrop from './DardAndDrop'
import Back from "./Back";
import { timeInterval } from "rxjs";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: 'background.paper',
    border: "2px solid white",
    // boxShadow: 24,
    p: 4,
};

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
//   MobileStepper: JSX.Element;
// }

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function BasicModal(props: any) {
    const [postData, setPostData] = React.useState({ image: [] })
    const [next, setNext] = React.useState(false)
    const [back ,setBack]= React.useState(false)
  
  
    const DiscardFunction = () => {

        setPostData({ image: [] })
        setNext(false)
        setBack(false)
       


    }
    const DiscardFunctionForUpload = () => {

        setPostData({ image: [] })

        setTimeout(() => {
            setNext(false)
            setBack(false)
            props.setOpenAddPost(false)
        }, 1000)


    }


    //******************************************************************** */

    

    return (
        <div>
            <Modal
                open={props.openAddPost}
                onClose={() => props.setOpenAddPost(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1 solid white",
                }}
            >
                <>
                   
                    {
                        back ? <Back DiscardFunction={DiscardFunction}  setBack={setBack} /> : <>{
                            next === false ? <Box width={"500px"} sx={{ height: "500px", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column" }} >
                                {
                                    postData?.image?.length < 1 ? <><Stack >
                                        {/* <Stack> <img height={'250px'} width={'300px'} src={uploadImage} /></Stack> */}
                                        <Stack ><DragAndDrop setPostData={setPostData} /></Stack>
                                    </Stack>
                                        <Stack>
                                            <input
                                                style={{ display: "none" }}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                onChange={(e: any) => setPostData({ ...postData, image: [...postData.image, ...e.target.files] })}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span">
                                                    Upload from device
                                                </Button>
                                            </label>

                                        </Stack>
                                    </> :
                                        <Stack display={'flex'} flexDirection={'row'}>

                                            <DisplayImages images={postData.image} setNext={setNext} setPostData={setPostData} setBack={setBack} />
                                        </Stack>}
                            </Box>
                                : <Box>
                                    <Caption images={postData.image} setNext={setNext} setPostData={setPostData} setOpen={props.setOpen} DiscardFunction={DiscardFunctionForUpload} />
                                </Box>




                        }</> 
                    }
                </>
                
            </Modal>
        </div>
    );
}

//onClick={handleSubmit(setComment)}