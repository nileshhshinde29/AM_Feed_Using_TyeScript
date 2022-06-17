import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, CardHeader, Divider, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import "./Modal.scss";
import { KeyboardArrowLeft, KeyboardArrowRight, PropaneRounded } from "@mui/icons-material";
//
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { autoPlay } from "react-swipeable-views-utils";
// import Likes from "./like/Likes";
// import { authenticationService } from "../../utils/auth.service";
import Modal from "@mui/material/Modal";
import Comments from "./Comments";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import { authenticationService } from "../../../utils/auth.service";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Emoji from "../emoji";
import DisplayLikedPeoples from './DisplayLikedPeoples'


// import CommentsModal from "../home/Modal/CommentsModal";

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

export default function BasicModal(props) {


  const ref = React.useRef(null)

  const [images, setImages] = React.useState(
    props?.data?.image?.map(
      (imgs: any , i: any) => `http://192.168.0.170:8080/${imgs.filename}`
    ) || []
  );
  const [data, setdata] = React.useState(props?.comments);
  
  React.useEffect(() => {

    setdata(props?.comments)

  }, [props?.comments])
  const [likess, setLikes] = React.useState(props.likess);
  // const userInfo = JSON.parse(localStorage.getItem("currentUser")) || "";
  // const[save , setSave]= React.useState()
  



  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ comment: "" });

  //******************************************************************** */
  const [replyData, setReplyData] = React.useState({

    state: false,
    reply: "",
    commentId: "",
    
  });

  //************************************************************** */
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  //*************************************************************************** */
  const replyOnComment = async () => {
    authenticationService.replyToComment(replyData.commentId, replyData.reply)
      .then((res) => { 

        let newData = data.map((items) => items._id === replyData.commentId ? { ...items , replies: [...items.replies, res] } : items)
              
        props.setComments(newData);
        setdata(newData);


        setReplyData({ state: false, reply: "", commentId: "" });
      })
      .catch((e) => console.log(e));
  };

  //****************************************************** */
  const likeComment = (commentId) => {


    authenticationService
      .likeToComment(commentId)
      .then(async (res) => {


        let newData = await data.map((items) => items._id === res._id ? res : items)

        setdata(newData)
        props.setComments(newData);

      })
      .catch((e) => console.log(e));
  };

  //********************************************************* */

  const likeReply = (replyId, comId) => {
    authenticationService
      .likeToReply(replyId)
      .then((res) => {

        let newData = data.map((itm )=> itm._id === comId ? {...itm , replies:itm.replies.map(rep => rep._id=== replyId ? res : rep)} :itm )
        setdata(newData);
        props.setComments(newData);
      })
      .catch((e) => console.log(e));
  };

  function focus() {
    ref.current.focus();
    
   }
//*******************emoji */

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Modal
        // open={true}
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1 solid white",
        }}
      >
        <Box sx={{ height: "500px", width: "800px", backgroundColor: "white" }}>
          <Grid xs={12} container sx={{ height: "100%", width: "100%" }}>
            <Grid item xs={6.8} className="center" sx={{ height: "100%" }}>
              <>
                <Box
                  className="container1"
                  sx={{ maxWidth: 450, marginLeft: "-5px" }}
                >
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    autoplay={false}
                    enableMouseEvents
                  >
                    {images.map((step, index) => (
                      <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          // <Box
                          //   component="img"
                          //   sx={{
                          //     height: "500px",
                          //     display: "block",
                          //     maxWidth: "450px",
                              
                          //      objectFit:'fill',
                          //     overflow: "hidden",
                          //     width: "100%",
                          //     padding:"-20px"
                          //   }}
                          //   src={step}
                          //   alt={step.label}
                          // />
                          <img src={step} height="500px" width="450px" />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <Button className="btn"></Button>
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
                  <Box className="mybtn">
                    <MobileStepper
                      sx={{
                        backgroundColor: "transparent",
                        color: "transparent",
                      }}
                      steps={maxSteps}
                      // position="static"
                      activeStep={activeStep}
                    />
                  </Box>
                </Box>
              </>
            </Grid>
            <Grid container className="center" item xs={5.2} >
              <Grid xs={12} minHeight="100px" item sx={{ width: "100%" }} >
                <CardHeader
                  sx={{ height: "30px" }}
                  avatar={
                    <Avatar
                      // sx={{ bgcolor: red[500] }}
                      src={`http://192.168.0.170:8080/${props.data?.createdBy.image}`}
                      aria-label="recipe"
                    >
                      R
                    </Avatar>
                  }
                  title={
                    <Typography fontFamily={" sans-serif"}>
                      {props.data?.createdBy.firstname}{" "}
                      {props.data?.createdBy.lastname}
                    </Typography>
                  }
                  subheader={
                    <Typography fontSize={"11px"} fontFamily={" sans-serif"}>
                      {props.data.location}
                    </Typography>
                  }
                />
                <Box sx={{ margin: "0px 0 0px 72px" }}>
                  <Typography
                    variant="body2"
                    fontSize={"12px"}
                  // sx={{ marginLeft: "53px" }}
                  >
                    {props.data?.caption}
                  </Typography>
                </Box>
                <Divider sx={{ margin: "10px 0 0 0" }} />
              </Grid>
              <Grid
                xs={12}
                // minHeight="298px"
                item
                sx={{ height: "250px", overflowY: "scroll" }}
              >
                {/* {comments} */}
                <Comments
                  data={props?.comments}
                  reply={replyData}
                  setReply={setReplyData}
                  likeComment={likeComment}
                  likeReply={likeReply}
                  focus={focus}
                />
              </Grid>

              {/* lower comments component */}
 
              <Grid xs={12} minHeight="150px" item>
                {/* <Divider sx={{ margin: "10px 0 0 0" }} /> */}

                <Stack
                  display={"flex"}
                  flexDirection="row"
                  margin={"0  5px 0 5px"}
                  // alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Box>
                    <IconButton sx={{ color: "black" }}>
                      

                      {props.likess ? (
                        <FavoriteIcon
                          className="clickAnimation"
                          sx={{ color: "red" }}
                          onClick={() => { props.setLikes((prv) => !prv); props.setLikeLength(prv => prv - 1) }}
                        />
                      ) : (
                        <>
                          <FavoriteBorderRoundedIcon
                            className="like"
                              onClick={() => { props.setLikes((prv) => !prv);  props.setLikeLength(prv=> prv+1)}}
                          />
                        </>
                      )}
                    </IconButton>
                  </Box>
                  <IconButton className="clickAnimation" sx={{ color: "black" }} onClick={() => props.saveThisPost()}>
                    {props.savePost ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
                  </IconButton>
                </Stack>
                <Box className="caption2">
                 
                  {(props.likesLength > 0 || props.likess) && < DisplayLikedPeoples likesArray={props.likesArray} length={props.likesLength} />}
                  
                  
                </Box>
                <Typography
                  variant="body1"
                  fontSize={"10px"}
                  sx={{ margin: "5px 0 0 10px", color: "#919EAB" }}
                >
                  <Moment to={`${props.data?.createdAt}`}></Moment>
                </Typography>
                <Divider sx={{ margin: "10px 0 0 0" }} />
                {replyData.state ? (
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
                    <Emoji prvValue={replyData.reply} type={'reply'} setValue={setReplyData} anchorEl={anchorEl} handleClose={handleClose} open1={open1} />
                    <TextField
                      sx={{ fontSize: "14px" }}
                     
                      // ref={ref}
                      variant="standard"
                      value={replyData.reply}
                      placeholder={
                        replyData.reply ? replyData.reply : "Add your reply..."
                      }
                      onChange={(e) =>
                        setReplyData({ ...replyData, reply: e.target.value })
                      }
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />
                    <IconButton
                      size="small"
                      className="clickAnimation"
                      sx={{ color: "#1890FF" }}
                    >
                      <Button
                        type="submit"
                        disabled={!replyData.reply}
                        sx={
                          watch("comment")
                            ? { color: "primary" }
                            : { color: "gray" }
                        }
                        onClick={() => replyOnComment()}
                      >
                        Post  {/* reply */}
                      </Button>
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    display={"flex"}
                      alignItems={"center"}
                    
                    justifyContent={"space-between"}
                    sx={{ margin: "0px 20px 0 10px" }}
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
                      sx={{ fontSize: "14px" }}
                        variant="standard"
                        inputRef={ref}
                      value={watch("comment")}
                      fullWidth
                      {...register("comment", {
                        required: "Comment is required",
                      })}
                      placeholder="Add your comment..."
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />
                    <IconButton
                      size="small"
                      className="clickAnimation"
                      sx={{ color: "#1890FF" }}
                    >
                      <Button
                        type="submit"
                        disabled={!watch("comment")}
                        sx={
                          watch("comment")
                            ? { color: "primary" }
                            : { color: "gray" }
                        }
                        onClick={handleSubmit((data) => {
                          props.setComment(data);
                          setValue("comment", "");
                        })}
                      >
                        Post
                      </Button>
                    </IconButton>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
