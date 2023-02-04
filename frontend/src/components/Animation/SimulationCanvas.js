import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import AnimationMesh from './AnimationMesh';
import AnimationCube from './AnimationCube';
import MovingCamera from './MovingCamera';


export default function SimulationCanvas(props){
    return(
        <div>
            <Canvas style = {styles.canvas} camera={{ position: [0, 25, 0]}}>
                <MovingCamera   setDefaultCam={props.setDefaultCam}
                                isDefaultCam = {props.isDefaultCam}/>
                <Physics>
                    <pointLight position={[0, 25, 0]} />
                    <pointLight position={[0, -25, 0]} />
                    <pointLight position={[0, 0, 25]} />
                    <pointLight position={[0, 0, -25]} />

                    {   props.isHex
                        ?   <AnimationCube  grid = {props.grid}
                                            currentFrame = {props.currentFrame}
                                            frames = {props.data}
                                            framesAmout = {props.framesAmout}
                                            currentSpeed = {props.currentSpeed}
                                            loadNextFrame = {props.loadNextFrame} 
                                            isLoaded = {props.isLoaded}
                                            togglePlay = {props.togglePlay}
                                            isRunning = {props.isRunning} />                
                        
                        :   <AnimationMesh  grid = {props.grid}
                                            currentFrame = {props.currentFrame}
                                            frames = {props.data}
                                            framesAmout = {props.framesAmout}
                                            currentSpeed = {props.currentSpeed}
                                            loadNextFrame = {props.loadNextFrame} 
                                            isLoaded = { props.isLoaded }
                                            togglePlay = {props.togglePlay}
                                            isRunning = {props.isRunning} />
                    }

                </Physics>
                <gridHelper args={[100, 100, '#ffffff', '#ffffff']}/>
            </Canvas>
        </div>
    )
}

const styles = {
    canvas:{
        border: 'solid 2px black',
        height: '900px',
        width: '900px',
        background: '#000000'
    },
}