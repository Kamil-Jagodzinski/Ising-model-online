import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function LoadingScreen() {
  return (
    <Box style = {styles.loadingBox} >
        <CircularProgress   style = {styles.loadingBoxElement}
                            thickness = {4} 
                            size = {200} />
        <Typography variant='h5' 
                    align='center' 
                    style = {styles.loadingBoxElement}> 
                    Czekanie na wyniki 
        </Typography> 
    </Box>
  );
}

const styles = {
    loadingBox:{
        display: 'flex',
        flexDirection: 'column',
        border: 'solid 2px black',
        alignItems: 'center',
        justifyContent: 'center', 
        height: '900px',
        width: '900px',
    },
    loadingBoxElement:{
        margin: '25px',
    }
}