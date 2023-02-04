import { Container, Grid } from "@mui/material";
import React from "react";
import LineChart from "./LinearChart";



export default function SimulationCharts(props) {
    
    return (
    <Container maxWidth='xl' style={styles.charts}>
        {props.temp ===  '1'  ?   
                                <Grid container>    
                                    <LineChart  value={props.energy}
                                                labels={ props.temperature }
                                                title='E(T)'/>    
                                    <LineChart  value={props.magnetization}
                                                labels={ props.temperature }
                                                title='M(T)'/>  
                                    <LineChart  value={props.sh}
                                                labels={ props.temperature }
                                                title='C(T)'/> 
                                    <LineChart  value={props.sus}
                                                labels={ props.temperature }
                                                title= { decodeURI('%CF%87') + '(T)'}/> 
                                </Grid>
                                
                            :    <Grid container>  
                                    <LineChart  value={props.energy}
                                                labels={ props.energy.map( (v,id)=>id ) }
                                                title='E(it)'/>    
                                    <LineChart  value={props.magnetization}
                                                labels={ props.magnetization.map( (v,id)=>id ) }
                                                title='M(it)'/>  
                                </Grid>}
    </Container>
)}

const styles = {
    charts:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '50px',
        marginTop: '50px',
    }
}