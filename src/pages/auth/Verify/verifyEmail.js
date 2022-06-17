// import { Button } from '@mui/material'
// import { Box } from '@mui/system'
// import React from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { authenticationService } from '../../../utils/auth.service';


import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { Typography } from '@mui/material';


export default function CircularIntegration() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error , setError]=React.useState(false)
    const timer = React.useRef();

    const { search } = useLocation()
    const token = search?.split("token=")[1];
    function Verify() {

    }





    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            // timer.current = window.setTimeout(() => {
            //     setSuccess(true);
            //     setLoading(false);
            // }, 2000);
            authenticationService.verifySentMail(token).then(res => {
                setSuccess(true);
                setLoading(false);
                
            }).catch(e => {

                timer.current = window.setTimeout(() => {

                    setLoading(false);
                    setError(true)
                    
            }, 2000);
               
            })

        }
    };
    

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' , height:'500px' }}>
            {error ?
                <Box><Typography sx={{ color: 'red' }}>Your link is expried or your Email Id is Already veryfied.<Button href={'/auth/signup'}>click here</Button>to Signup page</Typography></Box> :
            
                <>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        onClick={handleButtonClick}
                    >
                        {success ? <CheckIcon /> : <SecurityOutlinedIcon />}
                    </Fab>
                    {loading && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
                <Box sx={{ m: 1, position: 'relative' }}>
                    {!success ? <Button
                        variant="contained"
                        sx={buttonSx}
                        disabled={loading}
                        onClick={handleButtonClick}
                    >
                        Verify Email ID
                    </Button> : <Button>Verified</Button>}
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                        )}
                       
                    </Box>
                    <br />
                    <br />
                    <br />
                    <br />
                    {
                        success ? <Button href='/auth/login'>Click to login Page</Button> : ''
                    }</>
            }
        </Box>
    );
}



// function VerifyEmail() {

//     const { search } = useLocation()
//     const token = search?.split("token=")[1];
//     function Verify() {
//         authenticationService.verifySentMail(token).then(res=>console.log(res)  ).catch(e=>console.log(e))

//     }

//   return (
  
//       <Box margin="100px" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
//           <Button onClick={() => Verify()} variant='contained' >Click To Verify</Button>
//   </Box>
  
//     )
// }

// export default VerifyEmail