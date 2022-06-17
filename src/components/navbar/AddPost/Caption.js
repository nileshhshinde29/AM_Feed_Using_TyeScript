import { Autocomplete, Avatar, Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
// // import "./home.scss";
// import { styled } from "@mui/material/styles";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// // import "./home.scss";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";

import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { authenticationService } from "../../../utils/auth.service";
import Upload from './upload'
import Emoji from "../../../pages/home/emoji"
import { useContext } from 'react';
import { UserContext } from '../../../App'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function DisplayImages(props) {

	const user = useContext(UserContext)
	const Post = user.data
	const page = user.page



	const userInfo = JSON.parse(localStorage.getItem("currentUser")) || "";
	const [postData, setPostData] = useState({
		images: props.images || [],
		caption: "",
		location: ""
	})

	console.log(postData)
	const [upload, setUpload] = useState(false)


	const theme = useTheme();

	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = props.images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value)
	}


	const postData2 = {
		caption: "new Post",
		comments: [],
		createdAt: "2022-06-17T06:56:32.205Z",
		createdBy: {
			email: "nilesh@angularminds.in",
			firstname: "Nilesh",
			image: "image-1655287467056.jpg",
			lastname: "Shinde",
			_id: "6281ccbadc7ad759f5be1177",
		},
		email: "nilesh@angularminds.in",
		firstname: "Nilesh",
		image: "image-1655287467056.jpg",
		lastname: "Shinde",
		_id: "6281ccbadc7ad759f5be1177",
		deleted: false,
		image: [{ filename: "image-1655448992069.jpg", path: "src/uploads/image-1655448992069.jpg" }, { filename: "image-1655448992117.jpg", path: "src/uploads/image-1655448992117.jpg" }],

		likes: [],
		location: "Somewere on earth",
		updatedAt: "2022-06-17T06:56:32.205Z",
		_id: "62ac25a05a792df1fae3b7bb",
	}

	const AddPostFun = () => {

		const formData = new FormData()

		postData.images.map(image =>
			formData.append("image", image)
		)

		// formData.append("image", postData.images)
		formData.append("caption", postData.caption)
		formData.append("location", postData.location)

		authenticationService.AddPost(formData)
			.then(
				(res) => {
					setPostData({ images: [], caption: "", location: "" })
					user.setData(prv => ([res, ...prv]))
					setUpload(true)
				}
			).catch(e => console.log(e))
		


		

	}

	//*****************Emoji*************** */

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open1 = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};


	


	return (
		<>
			<Box
				className="container2"
				sx={{ width: "800px", backgroundColor: "white" }}
			>
				{
					upload ? <Stack height='500px'> <Upload discard={props.DiscardFunction} /> </Stack> :
						<>
							<Stack
								display={"flex"}
								alignItems={"center"}
								justifyContent={"space-between"}
								flexDirection={"row"}
							>
								<Stack>
									<Button onClick={() => props.setNext((prv) => !prv)}>Back</Button>
								</Stack>
								<Stack>
									<Button onClick={() => AddPostFun()}>Upload</Button>
								</Stack>
							</Stack>
							<Grid container spacing={2} sx={12}>
								<Grid item xs={8}>
									<AutoPlaySwipeableViews
										axis={theme.direction === "rtl" ? "x-reverse" : "x"}
										index={activeStep}
										onChangeIndex={handleStepChange}
										autoplay={false}
										enableMouseEvents
									>
										{/* {console.log(props.images)} */}
										{props.images.map((step, index) => (
											<div key={step.label}>
												{console.log(step.name)}
												{Math.abs(activeStep - index) <= 2 ? (
													<Box
														component="img"
														sx={{
															// marginTop: "30px",
															height: 470,
															display: "block",
															// maxWidth: "500px",
															// overflow: "hidden",
															width: "100%",
														}}
														src={URL.createObjectURL(step)}
														alt={step.label}
													/>
												) : null}
											</div>
										))}
									</AutoPlaySwipeableViews>
									<MobileStepper
										// sx={{position:"absolute"}}
										className="btn2"
										steps={0}
										position="static"
										nextButton={
											<Button
												size="small"
												onClick={handleNext}
												disabled={activeStep === maxSteps - 1}
											>
												{theme.direction === "rtl" ? (
													<KeyboardArrowLeft className="navButton" />
												) : (
													<KeyboardArrowRight className="navButton" />
												)}
											</Button>
										}
										backButton={
											<Button
												size="small"
												onClick={handleBack}
												disabled={activeStep === 0}
											>
												{theme.direction === "rtl" ? (
													<KeyboardArrowRight className="navButton" />
												) : (
													<KeyboardArrowLeft className="navButton" />
												)}
											</Button>
										}
									/>
									<Box className="mybtn2">
										<MobileStepper
											sx={{
												backgroundColor: "transparent",
												color: "transparent",
											}}
											steps={maxSteps}
											// position="static"
											activeStep={activeStep}
										/>
									</Box>
								</Grid>
								<Grid item container xs={4}>
									<Grid xs={12} item sx={{ height: "50px" }}>
										<Stack display={"flex"} alignItems="center" flexDirection={"row"}>
											<Avatar
												src={`http://192.168.0.170:8080/${userInfo.image}`}
												sx={{ height: "40px", width: "40px", marginRight: "10px" }}
											/>
											<Typography>
												{userInfo.firstname + " " + userInfo.lastname}
											</Typography>
										</Stack>
									</Grid>
									<Grid xs={12} item sx={{ height: "190px" }}>
										<TextField
											onChange={(e) =>
												setPostData({ ...postData, caption: e.target.value })
											}
											sx={{ fontSize: "14px" }}
											variant="standard"
											value={postData.caption}
											multiline
											maxRows={8}
											fullWidth
											placeholder="write a caption"
											InputProps={{
												disableUnderline: true, // <== added this
											}}
										/>
									</Grid>
									<Divider sx={{ color: "gray", width: "100%", height: "2px" }} />
									<Grid xs={12} item sx={{ height: "226px" }}>
										<Stack
											display={"flex"}
											alignItems="center"
											flexDirection={"row"}
											justifyContent={"space-between"}
										>
											<IconButton className="clickAnimation" sx={{ color: "black" }} onClick={handleClick}
												size="small"
												// sx={{ ml: 2 }}
												aria-controls={open1 ? 'account-menu' : undefined}
												aria-haspopup="true"
												aria-expanded={open1 ? 'true' : undefined}>
												<SentimentSatisfiedRoundedIcon />
											</IconButton>
											<Emoji prvValue={postData.caption} type={"caption"} setValue={setPostData} anchorEl={anchorEl} handleClose={handleClose} open1={open1} />

											<Typography
												fontSize={"12px"}
												sx={{ color: "gray", marginRight: "5px" }}
											>
												{postData?.caption?.length}/2000
											</Typography>
										</Stack>
										<Stack
											display={"flex"}
											alignItems="center"
											flexDirection={"row"}
											justifyContent={"space-between"}
										>
											<IconButton sx={{ color: "black" }}>

												<Box sx={{}}>
													<Autocomplete
														disablePortal
														id="combo-box-demo"
														options={Locations}
														sx={{ width: 200 }}
														onChange={(e, v) => setPostData({ ...postData, location: v.label })}
														renderInput={(params) => (
															<TextField

																{...params}
																label="Location"
																variant="standard"
																InputProps={{
																	...params.InputProps,
																	disableUnderline: true,
																}}
															/>
														)}
													/>
												</Box>
											</IconButton>
											<Typography>
												<IconButton>
													<LocationOnOutlinedIcon />
												</IconButton>
											</Typography>
										</Stack>
										<Stack
											display={"flex"}
											alignItems="center"
											flexDirection={"row"}
											justifyContent={"space-between"}
										>
											<IconButton className="clickAnimation" sx={{ color: "black" }}>

												<input
													style={{ display: "none" }}
													id="contained-button-file"
													multiple
													type="file"
													onChange={(e) =>
														props.setPostData((prv) => ({
															...prv,
															image: [...prv.image, ...e.target.files],
														}))
													}
												/>
												<label htmlFor="contained-button-file">
													<Typography
														sx={{ backgroundColor: "transparent", color: "gray" }}
														component="span"
													>
														Add Image
													</Typography>
												</label>
											</IconButton>
											<Typography>
												<IconButton>
													<label htmlFor="contained-button-file">
														{" "}
														<AddAPhotoOutlinedIcon />
													</label>
												</IconButton>
											</Typography>
										</Stack>
									</Grid>
								</Grid>
							</Grid></>

				}
			</Box>
		</>
	);
}

export default DisplayImages;


const Locations = [
	{ label: 'Mai ghat, Sangli ' },
	{ label: 'Krishna-Warana river Sangam, Haripur' },
	{ label: 'Rankala talav, Kolhapur' },
	{ label: 'Kas-pathar, Satara ' },
	{ label: 'Priti-Sangam,Karad' },
	{ label: 'Ganapati Mandir, Sangli' },
	{ label: 'Devbag-Sangam, Takarli' },
	{ label: 'Sangmeshwar Temple, Haripur', },
	{ label: 'Panhala road, Panhala ', },
	{ label: 'IsKon temple, Pune', },
	{ label: 'Rajiv Gandhi Reserve Forest, Pune ', },
	{ label: 'Sinhagad fort, pune', },
	{ label: 'Varanasi' },



]

