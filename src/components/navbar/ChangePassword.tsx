import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// web.cjs is required for IE11 support
// import { useSpring, animated } from 'react-spring/dist/react-spring.cjs';
import { Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, ListItemIcon, Menu, MenuItem, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import { authenticationService } from '../../utils/auth.service'
// import addPhotoIcon from '../../stories/assets/ic_add_a_photo.svg';
import addImageIcon from '../../Images/addImageIcon.png'
import { LockResetOutlined, Logout, ManageAccountsOutlined } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { showErrorToast, showSuccessToast } from "../../utils/toastUtil";
import { watch } from 'fs';






interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}
//




const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 17,
    height: 17,
    padding: 3,
    background: '#FAFAFA',
    border: '1px solid #DCE0E4',
    // border: `2px solid ${theme.palette.background.paper}`,
}));
export default function ProfileUpdateModal(props: any) {

    // const userInfo = JSON.parse(localStorage.getItem<any>("currentUser")) || "";


    const [open1, setOpen1] = React.useState({})





    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

//***************** */
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        getValues,
        setValue,
        reset,
        watch,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: "",
            oldPassword:'',
        },
    });

    const { search } = useLocation()
    const token = search?.split("=")[1];



    //* reset password function  
    // currentPass: ' ',
        // newPass: ' '
    const Reset = (data: any) => {

        if (data.password === data.confirmPassword) {
              console.log("hii")
            authenticationService.ChangePassword({ currentPass: watch('oldPassword'), newPass: watch('confirmPassword') }).then(
                res => { showSuccessToast('Password is updated successfuly'); reset({}); props.setModal((prv: any) => ({ ...prv, changePassword: false }))  }).catch(e=> setError('oldPassword',{type:'custom', message:e.message}))

        } else {
            console.log("hello")

            setError("confirmPassword", {
                type: "custom",
                message: "password must match",

            });
        }
    };


    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={props.open}

            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >

            {/* <Fade in={open}> */}
            <>
                <Box sx={style}>
                    <Grid xs={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button variant="text" sx={{ fontSize: '10px', color: "gray" }} type="button" onClick={() => props.setModal((prv: any) => ({ ...prv, changePassword: false }))}>x</Button>
                    </Grid>
                    <Box
                        
                    >
                        <Grid container spacing={3}>
                            
                            <Grid item xs={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography
                                    fontSize={25}
                                    sx={{ color: "#2e2e2d", fontFamily: "sans-serif" }}
                                >
                                    Change your password
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Current Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...register("oldPassword", {
                                        required: "please enter your password",
                                        pattern: {
                                            value:
                                                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                            message: "invalid password",
                                        },
                                    })}
                                    name="oldPassword"
                                    error={Boolean(errors.oldPassword)}
                                    helperText={errors.oldPassword?.message}
                                />


                            </Grid>
                            <Grid item xs={12} md={12} >
                                <TextField
                                    required
                                    fullWidth
                                    label="New Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...register("password", {
                                        required: "please enter your password",
                                        pattern: {
                                            value:
                                                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                            message: "invalid password",
                                        },
                                    })}
                                    name="password"
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />

                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmpassword"
                                    autoComplete="current-password"
                                    {...register("confirmPassword", {
                                        required: "please confirm your password",
                                        pattern: {
                                            value:
                                                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                            message: "invalid password",

                                        },
                                    })}
                                    name="confirmPassword"
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword?.message}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Button fullWidth variant="contained" onClick={handleSubmit(Reset)}>Reset Password</Button>
                            </Grid>
                           
                        </Grid>
                    </Box>
                </Box>
            </>
            {/* </Fade> */}
        </Modal>
    );
}