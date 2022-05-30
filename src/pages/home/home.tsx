import React from "react";
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
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function Login() {
  return (
    <Container className="container">
      <Card className="card">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} src={image} aria-label="recipe">
              R
            </Avatar>
          }
          title={
            <Typography fontFamily={" sans-serif"}>Pablo Escobar</Typography>
          }
          subheader={
            <Typography fontSize={"11px"} fontFamily={" sans-serif"}>
              Krisna-Warna river Sangam, Haripur
            </Typography>
          }
        />
        <CardMedia
          className="img"
          component="img"
          height="400"
          image={image}
          alt="Paella dish"
        />

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 10px 0 10px",
          }}
        >
          <Box>
            <IconButton sx={{ color: "black" }}>
              <FavoriteBorderRoundedIcon />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              {" "}
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Box>
          <IconButton sx={{ color: "black" }}>
            <BookmarkBorderOutlinedIcon />
          </IconButton>
        </Box>

        <Box className="caption">
          <Typography
            variant="body2"
            fontSize={"12px"}
            className="caption1"
            color="text.primary"
          >
            Pablo Escobar
          </Typography>
          <Typography variant="body2" fontSize={"12px"}>
            Haripur, the one of the most beautiful place in the world...
          </Typography>
        </Box>
        <Typography
          variant="body1"
          fontSize={"12px"}
          sx={{ margin: "2px 0 0 20px", color: "#919EAB" }}
        >
          View all 6 Comments
        </Typography>
        <Typography
          variant="body1"
          fontSize={"10px"}
          sx={{ margin: "5px 0 0 20px", color: "#919EAB" }}
        >
          3 hrs ago
        </Typography>
        <Divider sx={{ margin: "10px 0 0 0" }} />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ margin: "0 20px 0 10px" }}
        >
          <IconButton sx={{ color: "black" }}>
            <SentimentSatisfiedRoundedIcon />
          </IconButton>
          <TextField
            sx={{ fontSize: "14px" }}
            variant="standard"
            fullWidth
            placeholder="Add your comment..."
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          />
          <IconButton size="small" sx={{ color: "#1890FF" }}>
            Post
          </IconButton>
        </Box>
      </Card>
    </Container>
  );
}
