import React, { useEffect, useState } from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AddPost from "./AddPost";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./home.scss";
import image from "../../Images/Computer.jpg";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { Card, Grid, Input, Stack, TextField } from "@mui/material";
import { margin } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import { AccountCircle, CommentsDisabled } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Likes from "./like/Likes";
import { authenticationService } from "../../utils/auth.service";
import Modal from '@mui/material/Modal';
import CommentsModal from "../home/Modal/CommentsModal"
import { useForm } from "react-hook-form";
import Moment from 'react-moment';
import moment from "moment";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Emoji from './emoji'
import { baseURL } from '../../utils/constants/urls'





const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'5px',
    boxShadow: 24,
    p: 4,
};


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean; 
    MobileStepper: JSX.Element;
}


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



function Cards(props: any) {
    const userInfo = JSON.parse(localStorage.getItem("currentUser")) || "";

    const [images, setImages] = useState(props?.data?.image?.map((imgs: any, i: any) => `http://${baseURL}/${imgs.filename}`) || [])
    const [likess, setLikes] = useState(props.data?.likes?.map((item: any) => item._id).includes(userInfo._id) ? true : false)
    const [comments, setComments] = useState(props?.data?.comments || [])
    const [savePost, setSavePost] = useState(false)
    const [savedPost, setSavedPost] = useState([])
    const [likesLength, setLikeLength] = useState(props.data.likes?.length)
    const [likesArray, setLikesArray] = useState(props.data.likes)




    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    //**********************************************likes */
    function likePost() {
        authenticationService.like(props.data._id).then((res: any) => setLikesArray(res.likes)).catch(e => console.log(e))
        setLikes(!likess)
    }




    //************************************************Modal*** */
    const [open, setOpen] = React.useState(false);



// console.log(comments)
    // ****************************************Comments
    const { register, handleSubmit, getValues, formState: { errors }, watch, setValue } = useForm({ defaultValues: { comment: "" } })


    function setComment(data: any) {

        authenticationService.addComment(props?.data?._id, data).then((res: any) => setComments([...comments, res])).catch(e => console.log(e))

        setValue("comment", '')

    }


    useEffect(() => {
        getPost()
        

        // 
    }, [])
   
    useEffect(() => {
        if (savedPost.map((item:any) => item?._id).includes(props.data?._id)) {
            setSavePost(true)
        }
        else {
            setSavePost(false)
        }
    },[savedPost])




    moment.updateLocale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s",
            s: 'just now',
            ss: '%d seconds',
            m: "a minute",
            mm: "%d min",
            h: "an hour",
            hh: "%d hours",
            d: "1 day",
            dd: "%d days",
            w: "a week",
            ww: "%d weeks",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    });
     
    //*****************Emoji*************** */

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


     
   


    function getPost() {

        authenticationService.getSavedPosts(userInfo._id).then((res: any) => setSavedPost(res.savedPosts)).catch(e => console.log(e))
    }

    async function  saveThisPost() {

        await authenticationService.savePost(userInfo._id, props?.data?._id).then((res: any) => setSavedPost(res)).catch(e => console.log(e))
    }





    return (
        <div> <Container className="container">
            <Card className="card" >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} src={`http://${baseURL}/${props.data?.createdBy?.image}`} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={
                        <Typography fontFamily={" sans-serif"}>{props.data.createdBy?.firstname}{" "}{props.data?.createdBy?.lastname}</Typography>
                    }
                    subheader={
                        <Typography fontSize={"11px"} fontFamily={" sans-serif"}>
                            {props?.data?.location}
                        </Typography>
                    }
                />
                <>
                    <Box className="container1" sx={{ maxWidth: 450 }}>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            autoplay={false}
                            enableMouseEvents
                        >
                            {images.map((step: any, index: any) => (
                                <div key={step.label}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 400,
                                                display: 'block',
                                                maxWidth: "450px",
                                                overflow: 'hidden',
                                                width: '100%',
                                            }}
                                            src={step}
                                            alt={step.label}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <Button className="btn">

                        </Button>
                        <MobileStepper
                            className="btn"
                            steps={0}
                            position="bottom"
                            nextButton={
                                <Button

                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >

                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft className="navButton" />
                                    ) : (
                                        <KeyboardArrowRight className="navButton" />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight className="navButton" />
                                    ) : (
                                        <KeyboardArrowLeft className="navButton" />
                                    )}

                                </Button>
                            }
                        />
                        <Box className="btn2" >
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}

                            />
                        </Box>

                    </Box>

                </>


                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 10px 0 10px",
                    }}
                >
                    <Box>
                        <IconButton sx={{ color: "black" }}>
                            {/* <Likes data={props.data} /> */}
                            {likess ? <FavoriteIcon className="clickAnimation" sx={{ color: "red" }} onClick={() => { setLikeLength(likesLength - 1); likePost(); }} /> : <><FavoriteBorderRoundedIcon className="like" onClick={() => { setLikeLength(likesLength + 1); likePost(); }} /></>}
                        </IconButton>
                        <IconButton className="clickAnimation" sx={{ color: "black" }}>
                            {" "}
                            <ChatBubbleOutlineIcon onClick={() => setOpen(true)} />
                        </IconButton>
                    </Box>
                    <IconButton className="clickAnimation" sx={{ color: "black" }} onClick={() => saveThisPost()}>
                        {savePost ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
                    </IconButton>
                </Box>
                <Box className="caption">
                    <Typography
                        variant="body2"
                        fontSize={"10px"}
                        className="caption1"
                        color="text.primary"
                    >
                        {/* {likess && " like"} */}
                        {(likesLength > 0 || likess) && likesLength + " " + "likes"}
                    </Typography>
                </Box>

                <Box className="caption">
                    <Typography
                        variant="body2"
                        fontSize={"12px"}
                        className="caption1"
                        color="text.primary"
                    >
                        {props.data.createdBy?.firstname}{" "}{props.data.createdBy?.lastname}
                    </Typography>
                    <Typography variant="body2" fontSize={"12px"}>
                        {props.data?.caption}
                    </Typography>
                </Box >

                <Typography
                    variant="body1"
                    fontSize={"12px"}
                    sx={{ margin: "2px 0 0 20px", color: "#919EAB" }}
                    onClick={() => setOpen(true)}
                    className="clickAnimation"

                >
                    {comments?.length > 0 && (comments?.length > 1 ? `View all ${comments?.length} Comments` : `View  ${comments?.length} Comment`)}
                </Typography>
                <CommentsModal
                    savePost={savePost}
                    saveThisPost={saveThisPost}
                    likesLength={likesLength}
                    setLikeLength={setLikeLength}
                    open={open} setOpen={setOpen}
                    comments={comments}
                    data={props.data}
                    likess={likess}
                    setLikes={likePost}
                    setComment={setComment}
                    setComments={setComments}
                    likesArray={likesArray}
                />
                
                <Typography
                    variant="body1"
                    fontSize={"10px"}
                    sx={{ margin: "5px 0 0 20px", color: "#919EAB" }}
                >
                    <Moment to={`${props.data.createdAt}`}></Moment>

                </Typography>
                <Divider sx={{ margin: "10px 0 0 0" }} />
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ margin: "5px 20px 0 10px" }}
                >
                    <IconButton
                        className="clickAnimation"
                        sx={{ color: "black" }}
                        onClick={handleClick}
                        size="small"
                        // sx={{ ml: 2 }}
                        aria-controls={open1 ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open1 ? 'true' : undefined}
                    >
                        <SentimentSatisfiedRoundedIcon />
                    </IconButton>
                    <Emoji prvValue={watch("comment")} type={"comment"} setValue={setValue} anchorEl={anchorEl} handleClose={handleClose} open1={open1} />

                    <TextField
                        sx={{ fontSize: "14px"}}
                        variant="standard"
                        {...register("comment", { required: "Comment is required"})}
                        fullWidth
                        placeholder="Add your comment..."
                        value={watch("comment")}
                        // value="❤️"
                        InputProps={{
                            disableUnderline: true, // <== added this

                        }}

                    />

                    <IconButton size="small" className="clickAnimation" sx={{ color: "#1890FF" }}>
                        <Button type="submit" disabled={!watch("comment")} sx={watch("comment") ? { color: "primary" } : { color: '#99d6ff' }} onClick={handleSubmit(setComment)}>Post</Button>
                    </IconButton>

                </Box>
            </Card>
        </Container></div>
    )
}

export default Cards
