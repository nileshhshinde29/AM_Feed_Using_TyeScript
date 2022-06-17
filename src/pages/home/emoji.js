import React from 'react'
import { Button, Fade, Grid, IconButton, Menu, Popper } from '@mui/material'
import { Box } from '@mui/system'
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";



function Emojis(props) {

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setOpen(!open);
        setAnchorEl(event.currentTarget);
       
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;




    
    const emo = ["😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😍", "🥰", "😇", "🤩", "🤑", "🤪", "🤔"]
    return (



        <>
            <Menu
                anchorEl={props.anchorEl}
                id="account-menu"
                open={props.open1}
                onClose={props.handleClose}
                
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        paddingRight:'20px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5,
                        borderRadius: 2,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            bottom: 0,
                            left: 15,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >

                <Box sx={{ width: '15vw', height: 'auto' }}>
                    <Grid container  columns={{ xs: 2, sm: 8, md: 12 }}>
                        {emo.map((image, ind) => (
                            <Grid item xs={2} sm={2} md={2.4} key={ind} >
                                <Button className='clickAnimation' sx={{fontSize:"30px",height:'40px',width:'30px' }} onClick={() => props.type === "comment" ?
                                    props.setValue("comment", props.prvValue + emo[ind]) :
                                    props.type === "caption" ?
                                        props.setValue(prv => ({ ...prv, caption: props.prvValue + emo[ind] })) :
                                        props.setValue(prv => ({ ...prv, reply: props.prvValue + emo[ind] }))}>{image}</Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Menu>
        </>
        // <>
        //     <div>
                
        //         <IconButton /* onClick={() => props.setPostId(props.thisPostId) }*/ onClick={handleClick}  className="clickAnimation" sx={{ color: "black",  } }
        //             >
        //             <SentimentSatisfiedRoundedIcon  />

        //         </IconButton>
        //         <Popper open={/* props?.postId ? ( (props.postId === props.thisPostId && open) ? true:false) :  */ open} anchorEl={anchorEl} transition

        //             placement='top-start'
        //             sx={{
        //                 // paddingRight: '',
        //                 // marginBottom:'100px',
        //                 borderRadius:'10px',
                        
        //                 overflow: 'visible',
        //                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //                 // mt: 0.5,
        //                 borderRadius: 2,
        //                 '& .MuiAvatar-root': {
        //                     width: 32,
        //                     height: 32,
        //                     // ml: -0.5,
        //                     // mr: 1,
        //                 },
        //                 // '&:before': {
        //                 //     content: '""',
        //                 //     display: 'block',
        //                 //     position: 'absolute',
        //                 //     bottom: 0,
        //                 //     left: 15,
        //                 //     width: 10,
        //                 //     height: 10,
        //                 //     bgcolor: 'background.paper',
        //                 //     transform: 'translateY(50%) rotate(45deg)',
        //                 //     zIndex: 0,
        //                 // },
        //             }}>
        //             {({ TransitionProps }) => (
        //                 <Fade {...TransitionProps} timeout={350}>
        //                     <Box sx={{ height: 'auto', backgroundColor: 'white', borderRadius: '10px' }} >
        //                         <Grid container width="250px"  padding="10px" columns={{ xs: 2, sm: 8, md: 12 }}>
        //                             {emo.map((image, ind) => (
        //                                 <Grid  item xs={2} sm={2} md={2.4} key={ind} >
        //                                     <Button className='clickAnimation' sx={{fontSize:"30px",height:'50px',width:'30px' }} onClick={() => props.type === "comment" ?
        //                                         props.setValue("comment", props.prvValue + emo[ind]) :
        //                                         props.type === "caption" ?
        //                                             props.setValue(prv => ({ ...prv, caption: props.prvValue + emo[ind] })) :
        //                                             props.setValue(prv => ({ ...prv, reply: props.prvValue + emo[ind] }))}>{image}</Button>
        //                                 </Grid>
        //                             ))}
        //                         </Grid>
        //         </Box>
        //                 </Fade>
        //             )}
        //         </Popper>
        //     </div>
        // </>

    )
}

export default Emojis



