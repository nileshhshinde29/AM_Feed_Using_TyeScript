import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Divider, Stack } from '@mui/material';
import { baseURL } from '../../../utils/constants/urls'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 400,
    overflowY:'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

export default function BasicModal(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>

           

            <Typography sx={{marginLeft:'5px', fontSize:'12px'}} onClick={handleOpen}>{props.length}{" "}likes </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                   
                    <Box sx={style}>
                       
                        <Box sx={{margin:'10px 50% 10px 44%', fontFamily:'monospace' , fontWeight:'bolder' }}>likes</Box>
                        <Divider sx={{ height: '0.002px', backgroundColor: '#e7e8e6' }} />
                        
                        <Box style={{padding:'20px'}}>
                            {
                                props?.likesArray?.map((item: any, index: any) =>

                                    <>
                                        <Stack display={'flex'} gap={2} marginBottom={2} flexDirection={'row'} justifyContent='start'>

                                            <Stack>
                                                <Avatar
                                                    sx={{ height: "30px", width: "30px" }}
                                                    src={`http://${baseURL}/${item?.image}`}
                                                    aria-label="recipe"
                                                ></Avatar>
                                            </Stack>
                                            <Stack>
                                                <Typography sx={{ fontFamily: 'sans-serif', fontSize: '15px' }}>{item.firstname + " " + item.lastname}</Typography>
                                            </Stack>
                                        </Stack>
                                    </>
                                )

                            }
                        </Box>

                    </Box></>
            </Modal>
        </div>
    );
}
