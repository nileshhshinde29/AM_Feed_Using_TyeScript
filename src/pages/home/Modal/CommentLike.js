import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
} from "@mui/icons-material";
import React, { useState } from "react";

function CommentLike(props) {
    const [like ,setLike]= useState(props.isLike)
  return (
    <>
     {  like ? (
        <FavoriteIcon

        sx={{
          height: "15px",
          width: "15px",
          color: "red",
        }}
        onClick={() =>{ props.likeComment(props.id); setLike(!like)}}
        />
        
      ) : (
          <FavoriteBorderOutlined
            className="likeAnimation"

        sx={{
          height: "15px",
          width: "15px",
          color: "#919EAB",
        }}
           onClick={() =>{ props.likeComment(props.id); setLike(!like)}}
      />
      )}
    </>
  );
}

export default CommentLike