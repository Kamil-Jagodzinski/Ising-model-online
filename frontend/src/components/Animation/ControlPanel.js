import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FastForwardIcon from '@mui/icons-material/FastForward';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import Typography from '@mui/material/Typography';


export default function ControlPanel( props ){
    return(
        <Stack style = {styles.controlPanel} >
            <Slider     style = { styles.playSlider } 
                        valueLabelDisplay = "auto" 
                        min = { 0 }  max = { props.framesAmout-1 } step = {1}
                        value = { props.currentFrame }
                        disabled = { !props.isLoaded }
                        onChange={ (event) => props.frameHandler(event.target.value) } />

            <Container style = {{display: 'flex', justifyContent: 'space-between'}}>
                <Container>
                    <IconButton style = {styles.buttons}
                                disabled = { !props.isLoaded }
                                onClick = { () => props.frameHandler(0) } >
                                <SkipPreviousIcon fontSize = 'small' /> 
                    </IconButton >

                    <IconButton style = {styles.buttons}
                                onClick = { ()=>{ props.setDefaultCam(true) } }>
                                <CameraswitchIcon fontSize='small' />
                    </IconButton >

                    <IconButton style = {styles.buttons}
                                disabled = { !props.isLoaded }
                                onClick = { ()=>{ props.togglePlay(!props.isRunning) } }>
                        { !props.isRunning ? <PlayArrowIcon fontSize = 'small' /> : <PauseIcon fontSize = 'small' /> } 
                    </IconButton >

                    <IconButton style = {styles.buttons}
                                disabled = { !props.isLoaded }
                                onClick = { () => props.frameHandler(props.framesAmout-1) }>
                                <SkipNextIcon fontSize = 'small' /> 
                    </IconButton >
                </Container>

                <Container style = {{border: 'black 1px solid', width: '250px'}}>
                    <Typography align='center' variant='body1'> 
                        Temperatura 
                    </Typography>

                    <Typography align='center' variant='h5'> 
                        { props.temperature.length > 0 ? parseFloat(props.temperature[props.currentFrame]).toFixed(3) : 0.0 }K
                    </Typography>
                </Container>

                <Container style = {{display: 'flex', justifyContent: 'flex-end', alignItems: 'center',}}>
                    <FastForwardIcon fontSize = 'large' /> 
                    <Slider     style = { styles.speedSlider } 
                                valueLabelDisplay = "auto" 
                                min = { 1 }  max = { 30 } step = {1}
                                value = { props.currentSpeed }
                                disabled = { !props.isLoaded }
                                onChange={ (event) => props.speedHandler(event.target.value) } />
                </Container>

            </Container>
            
        </Stack> 
    )
}

const styles = {
    controlPanel:{
        backgroundColor: '#EBEBFF',
        height: '100px',
        width: '900px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid 2px blue',
    },

    buttons:{
        marginLeft: '4px',
        marginRight: '4px',
        width: '40px',
        height: '40px',
        backgroundColor: 'white',
        flexDirection: 'column',
        border: '3px solid black'
    },
    playSlider:{
        height: '10px',
        width: '850px',
    },

    speedSlider:{
        marginLeft: '14px',
        height: '10px',
        width: '200px',
    },
}