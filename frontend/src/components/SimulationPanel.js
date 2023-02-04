import React from 'react';
import SimulationCanvas from './Animation/SimulationCanvas';
import ParametersManager from './ParametersManager';
import LoadingScreen from './LoadingScreen';
import ControlPanel from './Animation/ControlPanel';
import SimulationCharts from './Charts/SimulationCharts';
import { Container } from '@mui/material';

const parseFrames = ( grid, res, isHex)=>{
    console.log('isHex: ' + isHex)
    const all_cells = res.length
    const cells_in_frame = isHex ? 2*grid*grid*grid : grid*grid;
    var start_cell = 0
    var temp = []
    while( start_cell + cells_in_frame <=  all_cells){
        temp.push( res.slice(start_cell, start_cell + cells_in_frame) )
        start_cell += cells_in_frame
    }
    return temp
}

export default class SimlationPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {  iter:   100,    temp:   '0',    free:   '1',    cell:   '0',
                        start:  1,      target: 1,      steps:  100,    grid:   8,
                        J: 1,   JD: 0,  JA: 0,  JB: 0,  JAB: 0, JDA: 0, JDB: 0,

                        frames: [[0]],      energy: [],         sus: [],
                        temperature: [],    magnetization: [],  sh: [],     

                        framesAmout: 1,     currentFrame: 0,    
                        currentSpeed: 1,    defaultCam: true,
                        
                        isHex: false,       isFetching: false,
                        isLoaded: false,    isRunning: false,
                        }
        };
    
    updateState(params){
        this.setState(
                {   iter: params.iter,
                    steps: params.steps,
                    temp: params.temp,
                    free: params.free,
                    start: params.start,
                    target: params.target,
                    grid: params.grid, 
                    J: params.J, 
                    JD: params.JD, 
                    JAB: params.JAB, 
                    JA: params.JA, 
                    JB: params.JB, 
                    JDA: params.JDA, 
                    JDB: params.JDB,
                    cell: params.cell }
            );
    }

    getGrids(result){
        var newResult = Array.from( result.split(',') );
        var temp = parseFrames( this.state.grid, newResult, this.state.isHex)
        this.setState({ 
            frames: temp,
            framesAmout: temp.length,
        });
        
        if(this.state.temp === '0'){
            this.setState({ 
                temperature: Array( temp.length ).fill(this.state.start),
            });
        }
    }

    getEnergy(result){
        var newResult = Array.from( result.split(',') );
        this.setState({ 
            energy: newResult,
        });
    }

    getMag(result){
        var newResult = Array.from( result.split(',') );
        this.setState({ 
            magnetization: newResult,
        });
    }

    getSH(result){
        var newResult = Array.from( result.split(',') );
        this.setState({ 
            sh: newResult,
        });
    }

    getSus(result){
        var newResult = Array.from( result.split(',') );
        this.setState({ 
            sus: newResult,
        });
    }

    getTemperature(result){
        if(this.state.temp === '1'){
            var newResult = Array.from( result.split(',') );
            newResult.map( (val,idx) => {newResult[idx] = parseFloat(val).toFixed(3)} ) 
            this.setState({ 
                temperature: newResult,
            });
        }
    }

    updateTemp(value){
        this.setState({ 
            temp: value,
        });
    }

    setFrame(value){
        this.setState({ 
            currentFrame: value,
        });
    }

    setSpeed(value){
        this.setState({ 
            currentSpeed: value,
        });
    }

    loadNextFrame(value){
        if(value <= this.state.framesAmout)
        this.setState({ 
            currentFrame: value,
        });
    }

    togglePlay = (play_stop) =>{
        this.setState(
            {   isRunning: play_stop }
        )
    }

    setDefaultCam = (val) =>{
        this.setState(
            {   defaultCam: val}
        )
    }

    async send_request() {
        this.setState ( {   frames: [[0]],  energy: [],         
                            sus: [],    temperature: [],    
                            magnetization: [],  sh: [],}
        )
        this.setState( {isFetching: true,
                        currentFrame: 0,
                        isHex: this.state.cell === '0' ? false : true} )
        await this.props.simulateApi.calculate(
            this.state.iter,    this.state.steps, 
            this.state.temp,    this.state.free, 
            this.state.start,   this.state.target, 
            this.state.grid,    this.state.J, 
            this.state.JD,      this.state.JAB, 
            this.state.JA,      this.state.JB, 
            this.state.JDB,     this.state.JDA, 
            this.state.cell, 
            (result)=> {
                this.getGrids(result);
            },(result)=> {
                this.getMag(result);
            },(result)=> {
                this.getEnergy(result);
            },(result)=> {
                this.getSus(result);
            },(result)=> {
                this.getSH(result);
            },(result)=> {
                this.getTemperature(result);
            })
        this.setState( {isFetching: false,
                        isLoaded: true })
      }

    render(){
    return (
        <Container maxWidth='xl'>
            <Container maxWidth='xl' style={styles.simulationPanel}>

                <ParametersManager  getParameters={this.updateState.bind(this)} 
                                    send={this.send_request.bind(this)} 
                                    updateTemp = {this.updateTemp.bind(this)}/>

                <Container style={styles.mainCanvas}>
                    {!this.state.isFetching ? <SimulationCanvas isLoaded = { this.state.isLoaded }
                                                                currentFrame = {this.state.currentFrame}
                                                                data = {this.state.frames}
                                                                framesAmout = {this.state.framesAmout}
                                                                currentSpeed = {this.state.currentSpeed}
                                                                isHex = {this.state.isHex}
                                                                isDefaultCam = {this.state.defaultCam}
                                                                setDefaultCam = {this.setDefaultCam.bind(this)}
                                                                togglePlay = {this.togglePlay.bind(this)}
                                                                loadNextFrame = {this.loadNextFrame.bind(this)} 
                                                                isRunning = {this.state.isRunning} 
                                                                grid = {this.state.grid} /> 
                                            : <LoadingScreen    style = {styles.loadingPopup} />}      
                    
                    <ControlPanel   currentFrame = {this.state.currentFrame}
                                    framesAmout = {this.state.framesAmout}
                                    frameHandler = {this.setFrame.bind(this)}
                                    speedHandler = {this.setSpeed.bind(this)}
                                    setDefaultCam = {this.setDefaultCam.bind(this)}
                                    currentSpeed = {this.state.currentSpeed}
                                    temperature = {this.state.temperature}
                                    isLoaded = {this.state.isLoaded} 
                                    isRunning = {this.state.isRunning} 
                                    togglePlay = {this.togglePlay.bind(this)}/>      
                </Container>    

            </Container>

            <Container maxWidth='xl' style = {styles.simulationCharts} >
                <SimulationCharts   magnetization = {this.state.magnetization}
                                    energy = {this.state.energy}
                                    temperature = {this.state.temperature}
                                    sh = {this.state.sh}
                                    sus = {this.state.sus}
                                    temp = {this.state.temp}/> 
            </Container>
                           
        </Container>)
    }
}

const styles = {
        simulationPanel:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        mainCanvas:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        simulationOverview:{
            display: 'flex',
            justifyContent: 'center',
        },
        simulationCharts:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50px',
        }

    }