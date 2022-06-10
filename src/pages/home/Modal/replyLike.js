import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
} from "@mui/icons-material";
import React, { useState } from "react";
 
function ReplyLike(props) {
   

    const [like, setLike] = useState(props.isLike);
    
  return (
    <>
      {like ? (
        <FavoriteIcon
          sx={{
            height: "15px",
            width: "15px",
            color: "red",
          }}
          onClick={() => {
            props.likeReply(props.id , props.comId) ;
            setLike(!like);
          }}
        />
      ) : (
        <FavoriteBorderOutlined
          sx={{
            height: "15px",
            width: "15px",
            color: "#919EAB",
          }}
          onClick={() => {
            props.likeReply(props.id, props.comId);
            setLike(!like);
          }}
        />
      )}
    </>
  );
}

export default ReplyLike;
