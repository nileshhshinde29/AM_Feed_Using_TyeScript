import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// web.cjs is required for IE11 support
// import { useSpring, animated } from 'react-spring/dist/react-spring.cjs';
import { Divider, FormControl, FormControlLabel, FormLabel, IconButton, ListItemIcon, Menu, MenuItem, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import {authenticationService} from '../../utils/auth.service'
// import addPhotoIcon from '../../stories/assets/ic_add_a_photo.svg';
import addImageIcon from '../../Images/addImageIcon.png'
import { LockResetOutlined, Logout, ManageAccountsOutlined } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { showErrorToast, showSuccessToast } from "../../utils/toastUtil";
import { setDefaultResultOrder } from 'dns/promises';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { baseURL } from '../../utils/constants/urls'






interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}
//

// authenticationService.uploadProfilePic(pic).then(res=>console.log(res)).catch(e=>console.log(e))



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
    const userInfo = JSON.parse(localStorage.getItem("currentUser")!) || "";
    

    const [open1 , setOpen1]=React.useState({})

    

    // const { open, handleCloseModal } = props;
    const { register, handleSubmit, control, formState: { errors }, watch, setError, getValues, setValue, reset } = useForm({
        mode: 'onChange',
        defaultValues: props.initialValues
    })


    const handlePhoneNumber = (value: any) => {
        console.log(value)
    }
  

    React.useEffect(() => {
        reset(props.initialValues)
    }, [props])
    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //************************************************** */
    function UpdateProfilePicture(image: any)
    {
        const formData = new FormData()
        formData.append('image', image)
        authenticationService.uploadProfilePic(userInfo._id, formData).then(res => { props.selfFetching(); showSuccessToast('Profile picture updated sucessfuly')} ).catch(e => console.log(e))
        handleClose()

    }
    function RemoveProfileFunction() {
        
        authenticationService.uploadProfilePic(userInfo._id, {}).then(res => { props.selfFetching(); showSuccessToast('Profile picture removed sucessfuly') }).catch(e => console.log(e))

    }
    function updateProfile() {

        if (watch("mobile").length < 15) {
            setError('mobile', {type:'custom',message:'mobile no must be 10 characters'})
        }
        else {
            const formData = new FormData()
            formData.append('email', watch('email'))
            formData.append('firstname', watch('name').split(' ')[0])
            formData.append('lastname', watch('name').split(' ')[1])
            formData.append('bio', watch('bio'))
            formData.append('gender', watch('gender'))
            formData.append('DOB', watch('DOB'))
            formData.append('mobile', watch('mobile'))

            authenticationService.uploadProfileInfo(userInfo._id, formData).then(res => { props.selfFetching(); showSuccessToast('Profile updated sucessfuly'); props.closed((prv:any)=> ({ ...prv, edit: false })) }).catch(e => console.log(e))

        }
       
    }

   
    
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
                <Box sx={style} >
                    <IconButton sx={{ position: 'absolute', top: '0px', right: '5px', fontSize: 'small' }} onClick={()=>props.closed('')}>
                        x
                    </IconButton>
                <Stack gap={2} component='form' onSubmit={handleSubmit(updateProfile)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent:"center" }}>
                        
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                            <Stack alignItems={'center'} gap={2}>
                                <Typography id="spring-modal-title" fontSize={24} fontWeight={700} fontFamily={'Public Sans'} color='#212B36'>
                                    Profile Update
                                </Typography>
                               
                        
                              
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                                        badgeContent={
                                            <SmallAvatar src={addImageIcon} alt="Remy Sharp" />
                                        }
                                    
                                    >

                                    <Avatar src={watch("image")?.name ? URL.createObjectURL(watch('image')) : `http://${baseURL}/${watch('image')}`} sx={{ width: 60, height: 60 }} />
                                </Badge>
                                <input
                                    style={{ display: "none" }}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={(e: any) => {  UpdateProfilePicture(e.target.files[0])}}
                                />
                            </Stack>

                        </IconButton>
                        
                    <Menu
                        anchorEl={anchorEl}
                            id="account-menu"
                            
                            open={open}
                           
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                borderRadius:'20px',
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    // ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 70,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                       
                            <MenuItem >
                                <ListItemIcon>
                                    <ManageAccountsOutlined />
                                    

                                    
                                </ListItemIcon >
                                <label htmlFor="contained-button-file">Update Photo</label>
                            </MenuItem >
                            <MenuItem onClick={() => RemoveProfileFunction()}>
                                <ListItemIcon>
                                    <LockResetOutlined />
                                </ListItemIcon>
                               Remove Photo

                            </MenuItem>
                            <Divider />

                            <MenuItem onClick={() => setValue('image',props.initialValues.image)} >
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Cancel
                            </MenuItem>
                            </Menu>
                    </Box>
                        <Stack gap={2}>
                            <TextField
                                margin="none"
                                size='small'
                                 
                                fullWidth
                                // defaultValue="shrikantnale17@gmail.com"
                                id="name"
                                label="Name"
                                autoComplete='off'
                            {...register('name', { required: 'name is required' })}
                            error={Boolean(errors.name)}
                            helperText={errors.name && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' />{" "} {errors.name?.message}</Stack>}
                            />
                            <TextField
                                margin="none"
                                size='small'
                                // required
                            fullWidth
                                // defaultValue="shrikantnale17@gmail.com"
                                id="email"
                                label="Email id"
                                autoComplete="off"
                                // {...register('email', { required: 'email is required' })}
                              {...register("email", {
                                required: "please enter your email",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address",
                                },
                              })}
                            error={Boolean(errors.email)}
                            helperText={errors.email && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' />{' '} {errors.email?.message}</Stack>}
                            />
                            <TextField
                                id="outlined-textarea"
                                // label="Bio"
                                placeholder="Enter your bio here.."
                                multiline
                                rows={3}
                            {...register('bio', { required: 'bio is required' })}
                            error={Boolean(errors.bio)}
                            helperText={errors.bio && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' />{' '} {errors.bio?.message}</Stack>}
                            />
                            <FormControl sx={{ color: '#919EAB' }} >
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 16 }}>Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue={getValues('gender')}
                                >
                                    <FormControlLabel value="male" control={<Radio color='success'  {...register('gender')} />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio color='success' {...register('gender')} />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio color='success' {...register('gender')} />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormControl>
                                    <Controller
                                        render={({ field }) =>
                                            <DatePicker
                                                // disableFuture
                                                label="Date of Birth"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                inputFormat={'dd/MM/yyyy'}
                                                value={getValues('DOB')}
                                                onChange={field.onChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        }
                                        {...register('DOB', {
                                            required: 'please enter your DOB'
                                        })}
                                        control={control}
                                />
                                <p style={{ color: 'red', fontSize: '12px', marginLeft: "5px" }}>{errors.DOB && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' /> {' ' }{errors.DOB?.message}</Stack>}</p>
                                
                                </FormControl>
                        </LocalizationProvider>
                        <Controller
                            render={({ field }) =>
                                <MuiPhoneNumber defaultCountry={'in'}  
                                    value={watch('mobile')}
                                    onChange={field.onChange}
                                />
                            }
                            {...register('mobile', {
                                required: 'please enter your mobile',
                                // pattern: {
                                //     value: watch('mobile')>3 ,
                                //     message: "invalid mobile number",
                                // },
                            })}
                            control={control}
                        />
                        <p style={{ color: 'red', fontSize: '12px', marginLeft: "5px" }}>{errors?.mobile && <Stack direction={'row'}><WarningRoundedIcon height='0.6rem' width='0.6rem' />{' '} {errors.mobile?.message}</Stack>}</p>
                        </Stack>
                        <Button variant='contained' type='submit' sx={{ textTransform: 'none' }}>
                            Save Profile
                        </Button>
                    </Stack>
                </Box>
            {/* </Fade> */}
        </Modal>
    );
}