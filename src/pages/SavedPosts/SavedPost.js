import { Grid, Stack } from '@mui/material'
import { Box, margin, padding } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { authenticationService } from '../../utils/auth.service';
import CommentsModal from '../../pages/home/Modal/CommentsModal'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));










function SavedPost() {
  const userInfo = JSON.parse(localStorage.getItem("currentUser")) || "";
  const [savedPost, setSavedPost] = useState([])
  const [index, setIndex]= useState(0)
  const [open, setOpen] = React.useState(false);
  const [likess, setLikes] = useState(false)      //useState(props.data.likes.map((item: any) => item._id).includes(props.data.createdBy._id) ? true : false)
  const [comments, setComments] = useState([])
  const [likesLength, setLikeLength] = useState(0)
  const [savePost, setSavePost] = useState(true )






  

  function getPost() {
    
    authenticationService.getSavedPosts(userInfo._id).then(res => { setSavedPost(res.savedPosts)  } ).catch(e=> console.log(e))
  }

  

  async function saveThisPost() {

    await authenticationService.savePost(userInfo._id, savedPost[index]?._id).then(res => { setOpen(false); setSavedPost(res)}).catch(e => console.log(e))
    setSavePost(!savePost)
  }

   


  

  useEffect(() => {

    getPost()
    // setLikes(savedPost[index]?.likes.map((item) => item._id).includes(savedPost[index].createdBy._id) ? true : false)

  }, [likess, comments])


  useEffect(() => {
    if (savedPost?.map(item => item._id).includes(savedPost[index]?._id)) {
      setSavePost(true)
    }
    else {
      setSavePost(false)
    }
  }, [savedPost])
  
  
  function setComment(data) {

    authenticationService.addComment(savedPost[index]._id, data).then((res) => setComments([...comments, res])).catch(e => console.log(e))

    // setValue("comment", '')

  }
  function likePost() {
    authenticationService.like(savedPost[index]._id).then((res) => console.log("liked")).catch(e => console.log(e))
    
    setLikes(!likess)
  }


  

  return (
      <Stack display="flex" alignItems="center">
      <Box sx={{  width: "1000px", marginTop: "80px", height: "auto" ,padding:'30px'  }}>
        
        
          <Grid container spacing={4}>
           
          
          {
            savedPost?.map((item, i) => 
              
              <Grid item xs={4} key={i} >
             
                    
                <img src={`http://192.168.0.170:8080/${item.image[0].filename}`} height="280px" width="250px" onClick={() => { setIndex(i); setComments(savedPost[i]?.comments); setLikeLength(savedPost[i]?.likes?.length); setOpen(!open) }} />

               
              </Grid>
            )

          }
          </Grid>

        
      </Box>
      {/* <CommentsModal open={open} setOpen={setOpen} comments={comments}
        data={props.data} likess={likess} setLikes={likePost}
        setComment={setComment} setComments={setComments} likess={likess} setLikes={likePost} /> */}

      {open && <CommentsModal savePost={savePost} saveThisPost={saveThisPost} likesLength={likesLength} setLikeLength={setLikeLength} open={open} setOpen={setOpen} likess={likess} setLikes={likePost} data={savedPost[index]} comments={comments} setComment={setComment} setComments={setComments} />}
      </Stack>

  )
}

export default SavedPost