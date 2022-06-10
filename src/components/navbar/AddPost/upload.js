import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import uploadImage from '../../../Images/uploadImage.jpg'
import { Button, Stack } from '@mui/material';
import { borderRadius, height } from '@mui/system';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress sx={{ height: "20px", borderRadius: "10px" }} variant="determinate" {...props} />
            </Box>

        </Box>
    );
}

LinearProgressWithLabel.propTypes = {

    value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
    const [uploading, setUploading] = React.useState(true)
    const [progress, setProgress] = React.useState(0);

    const lastFunction = () => {
        setUploading(false);
        props.discard()

    }


    React.useEffect(() => {
        const timer = setInterval(() => {

            setProgress((prevProgress) => (prevProgress >= 100 ? lastFunction() : prevProgress + 5));

        }, 80);
        console.log(uploading)
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'space-between' }}>
            <Stack><img src={uploadImage} /> </Stack>
            <Stack sx={{ width: '80%', marginTop: "50px" }}><LinearProgressWithLabel value={progress} /></Stack>
            <Button variant='contained' sx={{ opacity: uploading ? '0.5' : "1", marginTop: "50px" }}>{uploading ? 'Uplading' : "uploaded"}</Button>
        </Box>
    );
}
