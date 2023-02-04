import React from 'react'
import { usePlane } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'


export default function AnimationCube(props) {

    console.log( "props.framesAmout: " + props.framesAmout)

    const xy = 12 //cube edge 
    const gs = props.grid //cube size
    const r = xy/gs //cell radius

    const[loader, setLoader] = React.useState(0)


    const [ref] = usePlane(() =>(
        {   
            position: [0, 0, 0], //x, z, y
            rotation: [-Math.PI/2, 0, 0],
        }
    ))

    const colorPick = (idx, val) =>{
        if( idx% 2 === 0){
            if(val === '1')  return '#990000'
            if(val === '-1')  return '#b30000'
            if(val === '0')  return '#cc0000'
            if(val === '2')  return '#e60000'
            if(val === '-2')  return '#ff0000'
        }
        else{
            if(val === '-5')  return '#001f4d'
            if(val === '-3')  return '#002966'
            if(val === '-1')  return '#003380'
            if(val === '0')  return '#003d99'
            if(val === '1')  return '#003d99'
            if(val === '3')  return '#0052cc'
            if(val === '5')  return '#005ce6'
        }
    }

    const calcPosistion = (idx) =>{
        const xx = ( parseInt(idx/2)%(gs) )
        const yy = ( parseInt( parseInt(idx/2)%(gs*gs)/gs)  )
        const zz = ( parseInt( parseInt(idx/2)/(gs*gs) )  )
        const x =  -2 - xy/2 + r + r * 1.2 * xx + (idx%2) * 0.2 * r + 0.10*Math.random()
        const y =   2 + xy/2 - r - r * 1.2 * yy + (idx%2) * 0.2 * r + 0.10*Math.random()
        const z =   3 + xy - r - r * 1.2 * zz + (idx%2) * 0.2 * r + 0.10*Math.random()
        return [x, y, z]
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
                        <mesh   position={ calcPosistion(idx) }
                                key = {idx}>
                            <sphereBufferGeometry     args={[ 0.5*r, 8, 8]} />


                            <meshStandardMaterial   color = { colorPick(idx, value) } 
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
