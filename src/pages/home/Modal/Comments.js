import { FavoriteBorderOutlined, FavoriteBorderRounded } from '@mui/icons-material'
import { Avatar, CardHeader, Grid, IconButton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { authenticationService } from '../../../utils/auth.service'
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentLike from './CommentLike'
import ReplyLike from './replyLike'
import { baseURL } from '../../../utils/constants/urls'


function Comments(props) {

  const [comments, setComments] = useState([1, 2, 3])
  useEffect(() => {
    setComments(props?.data?.map((itms) => itms))
  }, [props])

  const [openReply, setReply] = useState('')

  const userInfo = JSON.parse(localStorage.getItem("currentUser")) || "";




  moment.updateLocale('en', {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: 'just now',
      ss: '%d seconds',
      m: "1 min",
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

  //*************************like to comment************************** */



  return (
    <>
      {[...comments].reverse().map((item, i) => (
        <Box >
          {" "}

          <Grid
            key={item?._id}
            container
            xs={12}
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                // flexDirection: "column",
                justifyContent: "start",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ height: "30px", width: "30px" }}
                    src={`http://${baseURL}/${item?.commentedBy?.image}`}
                    aria-label="recipe"
                  ></Avatar>
                }
              />
            </Grid>
            <Grid
              sx={{
                height: "45px",
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              item
              xs={2}
            >
              <Stack
                sx={{
                  fontSize: "12px",
                  overflow: "hidden",
                  fontFamily: "sans-serif",
                  fontWeight: "bolder",
                }}
              >
                {item?.commentedBy?.firstname}
              </Stack>
              <Stack sx={{ width: "60px", fontSize: "10px", color: "#919EAB" }}>
                <Moment to={`${item?.createdAt}`}></Moment>
              </Stack>
            </Grid>
            <Grid
              sx={{
                height: "45px",
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              item
              xs={6}
            >
              <Stack sx={{ fontSize: "10px", color: "#919EAB" }}>
                {item?.comment}
              </Stack>
              <Stack
                sx={{ fontSize: "10px", color: "#919EAB" }}
                onClick={() =>
                {
                  props.setReply((prv) => ({
                    ...prv,
                    state: !prv.state,
                    commentId: item?._id,
                  })); props.focus()
                 }
                }
              >
                Reply
              </Stack>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                height: "5px",
                width: "5px",
              }}
              item
              xs={1}
            >
              {/* <IconButton> */}

                  <CommentLike likeComment={props.likeComment} id={item._id} isLike={item?.likes?.map((itm) => itm._id).includes(userInfo?._id)} />
              {/* </IconButton> */}
            </Grid>
          </Grid>
          <Stack>
            <Stack
              fontSize="10px"
              color="gray"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Stack onClick={() => setReply(prv => prv === item._id ? "" : item._id)}>
                {item?.replies?.length > 0 && `----- ${openReply==item._id ? 'hide': "view"} ${item?.replies?.length} reply`}
              </Stack>
            </Stack>
            <Stack
              fontSize="10px"
              color="gray"
              display="flex"
              flexDirection="row"
              justifyContent="center "
              alignItems="space-between"
              sx={
                openReply === item._id ? { display: true } : { display: "none" }
              }
            >
              <Grid>
                {item?.replies?.length > 0 &&
                  [...item?.replies].reverse().map((it, i) => (
                    <Grid
                      container
                      // xs={12}
                      spacing={2}
                      fontSize="10px"
                      color="gray"
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="space-between"
                      margin={"5px"}
                    >
                      <Grid item xs={2}>
                        <Avatar
                          sx={{ height: "20px", width: "20px" }}
                          src={`http://${baseURL}/${it?.repliedBy?.image}`}
                          aria-label="recipe"
                        ></Avatar>
                      </Grid>
                      <Grid sx={{ minWidth: "60px" }} item xs={2}>
                        <Grid>{it?.repliedBy?.firstname} </Grid>
                        <Grid>
                          <Moment to={`${it?.createdAt}`}></Moment>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Grid>{it?.reply}</Grid>
                      </Grid>
                      <Grid item xs={1  }>
                        <Grid>
                          {/* {console.log(it?.likes?.map(it2=>it2._id).includes(userInfo._id))} */}
                          {/* <FavoriteBorderOutlined
                            sx={{
                              height: "10px",
                              width: "10px",
                              color: `${it?.likes?.map(it2=>it2._id).includes(userInfo._id) ? "red" :"gray"}`,
                            }}
                            onClick={()=>props.likeReply(it?._id ,item._Id)}
                          /> */}
                          <ReplyLike likeReply={props.likeReply} id={it?._id} comId={item._id} isLike={it?.likes?.map(it2 => it2._id).includes(userInfo._id)} />
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          </Stack>
        </Box>
      ))}
    </>
  );
}

export default React.memo(Comments)