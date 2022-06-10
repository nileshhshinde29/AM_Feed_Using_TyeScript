import React from 'react'
import emoji from '../../Images/Emoji.svg'
import emoji1 from '../../Images/Emoji (1).svg'
import emoji2 from '../../Images/Emoji (2).svg'
import emoji3 from '../../Images/Emoji (3).svg'
import emoji4 from '../../Images/Emoji (4).svg'
import emoji5 from '../../Images/Emoji (5).svg'
import emoji6 from '../../Images/Emoji (6).svg'
import emoji7 from '../../Images/Emoji (7).svg'
import emoji8 from '../../Images/Emoji (8).svg'
import emoji9 from '../../Images/Emoji (9).svg'
import emoji10 from '../../Images/Emoji (10).svg'
import emoji11 from '../../Images/Emoji (11).svg'
import emoji12 from '../../Images/Emoji (12).svg'
import emoji13 from '../../Images/Emoji (13).svg'
import emoji14 from '../../Images/Emoji (14).svg'
import { Grid, Menu } from '@mui/material'
import { Box } from '@mui/system'


function emojis(props) {


    const emo = ["😄", "😁", "😆", "😅", "🤣", "🤣", "😂", "🙂", "🙃", "😍", "🥰", "😇", "🤩", "🤑", "🤪", "🤔"]
    const emojisArray = [emoji, emoji1, emoji2, emoji3, , emoji4, emoji5, emoji6, emoji7, emoji8, emoji9, emoji10, emoji11, emoji12, emoji13, emoji14]
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

                <Box sx={{ width: '15vw', height: 'auto', padding: "10px 10px 20px 10px" }}>
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                        {emojisArray.map((image, ind) => (
                            <Grid item xs={2} sm={2} md={2.4} key={ind} >
                                <img src={image} onClick={() => props.type === "comment" ?
                                    props.setValue("comment", props.prvValue + emo[ind]) :
                                    props.type === "caption" ?
                                        props.setValue(prv => ({ ...prv, caption: props.prvValue + emo[ind] })): 
                                        props.setValue(prv=>({...prv, reply:props.prvValue+ emo[ind]}))} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Menu>
        </>

    )
}

export default emojis