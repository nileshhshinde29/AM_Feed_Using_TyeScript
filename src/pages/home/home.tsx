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
import { Input, Stack, TextField } from "@mui/material";
import { margin } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  path: string;

}

export default function Login() {

  const [posts, setPost] = useState([])
  console.log(posts)

  const myFunctionOfFetching = () => {

    authenticationService.getPosts()
       .then((res: any) => {

           setPost(res.results)

            }).catch((e) => {
       
      });
  };

  

  useEffect(() => {
    myFunctionOfFetching()
  }, [])
  return (

    <>
      {posts.map((item, index) => <Cards key={item._id} data={item} />)}
    </>
  );
}
