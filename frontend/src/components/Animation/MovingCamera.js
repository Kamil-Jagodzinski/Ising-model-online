import React from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export default function MovingCamera(props){
    console.log('props.isDefaultCam: ' + props.isDefaultCam) 
    const { camera, gl } = useThree();
    if( props.isDefaultCam === true){
      camera.position.set(0, 25, 0);
      camera.lookAt(0, 0, 0);
      props.setDefaultCam(false)
    }


    React.useEffect(
      () => {
        console.log("props.isDefaultCam: " + props.isDefaultCam)
        const controls = new OrbitControls(camera, gl.domElement);
               
        controls.minDistance = 3;
        controls.maxDistance = 40;
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]  
    );
    return null;
  };