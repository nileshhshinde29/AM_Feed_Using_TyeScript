import React, { useState } from 'react'
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { authenticationService } from '../../../utils/auth.service';
import FavoriteIcon from "@mui/icons-material/Favorite";


function Likes(props: any) {
  
  const { _id, likes,createdBy } = props.data
  const [likess, setLikes] = useState(likes.map((item: any) => item._id).includes(createdBy._id) ? true :false)
  
  console.log(likess)
  function likePost() {
    authenticationService.like(_id).then((res: any) => { console.log(res) }).catch(e => console.log(e))   
    setLikes(!likess)
  }

  return (
    <>
     
      {likess ? <FavoriteIcon onClick={() => likePost()} /> : <><FavoriteBorderRoundedIcon onClick={() => likePost()} /></>}
    </>
  )
}

export default Likes