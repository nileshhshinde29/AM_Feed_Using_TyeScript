import React, { useEffect, useState } from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AddPost from "./AddPost";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
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
import { Input, Skeleton, Stack, TextField } from "@mui/material";
import { margin } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InfiniteScroll from "react-infinite-scroll-component";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Cards from "./Card"
import Cookies from "js-cookie";
import "./card.scss"
import { authenticationService } from "../.././utils/auth.service";
import { post } from "../../utils/http/httpMethods";
import { useContext } from "react";
import { UserContext } from '../../App'


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  path: string;

}

export default function Login() {

  const user = useContext<any>(UserContext);
  const AllPost = user.data
  const Page = user.page
 

  const [posts, setPost] = useState([])
  const [postId, setPostId] = useState('')

  const [allPost, SetAllPost] = useState<any>([])
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(1);




  const myFunctionOfFetching = () => {

    authenticationService.getPosts(Page)
      .then((res: any) => {
        user.setData([...AllPost, ...res.results]);
        console.log(res)
        setTotalPages(res.totalPages)
      }).catch((e) => {
        setLoading(false);
      });
  };




  useEffect(() => {

    myFunctionOfFetching()

  }, [])



  useEffect(() => {
    if (Page !== 1 && Page <= totalPages) {
      myFunctionOfFetching();
      console.log("inc...")
    }
  }, [Page])

  const fetchMoreData = () => {
    console.log('hello')
    user.setPage((prev:any) => prev + 1);
  }

  console.log(AllPost)

  return (






    <>
      <InfiniteScroll
        dataLength={AllPost.length}
        scrollThreshold={1}
        next={fetchMoreData}
        hasMore={Page < totalPages}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={<><Container className="container "><Box sx={{ width: 450, marginRight: 0.5, my: 5 }}>
          <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={450} height={400} />
            <Skeleton variant="rectangular" width={450} height={10} />
            <Skeleton variant="rectangular" width={450} height={20} />
            <Skeleton variant="rectangular" width={450} height={10} />
            <Skeleton variant="rectangular" width={450} height={30} />
          </Stack>
        </Box>
        </Container>
        </>}
      >
        { AllPost && AllPost?.map((item: any, index: any) => <Cards postId={postId} key={item._id} setPostId={setPostId} data={item} />)}

      </InfiniteScroll>
    </>
  );
}


// export { SetAllPost } 




//   {posts.map((item, index) => <Cards postId={postId} setPostId={setPostId} key={item._id} data={item} />)}