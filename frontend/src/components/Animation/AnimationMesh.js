import React from 'react'
import { usePlane } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'



export default function AnimationMesh(props) {

    
    const xy = 18 //plane size
    const gs = props.grid //grid size
    const r = xy/gs //cell radius

    const[loader, setLoader] = React.useState(0)

    const [ref] = usePlane(() =>(
        {   
            position: [0, 0, 0], //x, z, y
            rotation: [-Math.PI/2, 0, 0],
        }
    ))

    const colorPick = (val) =>{
        if(val === '1')  return '#d40036'
        if(val === '-1')  return '#6c00b8'
        if(val === '0')  return '#a10076'
        if(val === '2')  return '#ff0000'
        if(val === '-2')  return '#3300ff'

    }
    
    useFrame( ()=>{
        if( !props.isRunning ){
            return
        }
        
        if( props.currentFrame === props.framesAmout-1){
            props.togglePlay( false )
            return
        }

        setLoader(loader+props.currentSpeed)
        
        if(loader >= 10 && props.currentFrame < props.framesAmout-loader/10){
            props.loadNextFrame(props.currentFrame + parseInt(loader/10) )
            setLoader( loader - 10 )
        }
        else if(loader >= 10 && props.currentFrame < props.framesAmout-1){
            props.loadNextFrame(props.currentFrame + 1 )
            setLoader( 0 )
        }
    })

    return (
        <mesh ref = {ref}>
            {   props.frames[ props.currentFrame ].map( (value, idx)=>{
                return( 
                        <mesh   position={ [ -xy + r + 2*r*(idx%gs) + 0.10*Math.random(), 
                                              xy - r - 2*r*parseInt(idx/gs) + 0.10*Math.random(), 
                                              0.10*Math.random()] }
                                key = {idx}>
                            <sphereBufferGeometry     args={[ 1.2*r, 8, 8]} />


                            <meshStandardMaterial   color = { colorPick(value) } 
                                                    opacity = { props.isLoaded ? 1 : 0 } 
                                                    transparent
                                                    metalness={0.6}
                                                    clearcoat={0.95} />
                        </mesh>
                )}) 
            }
        </mesh>
    )
}
