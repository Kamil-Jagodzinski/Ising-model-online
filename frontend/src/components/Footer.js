import React from "react";
import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';


export default function Footer() {

    return <Container maxWidth='xl' style={styles.desc}>
        <Typography style={styles.fromTop} align='center' variant='subtitle2'> 
            Projekt został wykonany w ramach pracy dyplomowej         
        </Typography>
    </Container >
}    

const styles = {
    desc:{
        display: 'flex',
        padding: '20px',
        alignItems: 'center',
        color: 'white',
        backgroundColor: ' #1976D2',
        justifyContent: 'center',
        border: 'solid 3px rgba(35, 55, 255, 1)',
      }
}