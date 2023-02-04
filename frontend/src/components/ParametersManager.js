import React from "react";
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl  from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container'


export default function ParametersManager( props ){

    const [iter, setIter] = React.useState( 100 );
    const [steps, setSteps] = React.useState( 100 );
    const [temp, setTemp] = React.useState( '0' );
    const [free, setFree] = React.useState( '1' );
    const [start, setStart] = React.useState( 1 );
    const [target, setTarget] = React.useState( 1 );
    const [grid, setGrid] = React.useState( 8 );
    const [isFetching, setFetchStatus] = React.useState( false );
    const [J, setJ]  = React.useState( 1.0 );     /*  J */
    const [JD, setJD]  = React.useState( 0.0 );     /*  JD */
    const [JAB, setJAB]  = React.useState( 0.0 );
    const [JA, setJA]  = React.useState( 0.0 );
    const [JB, setJB]  = React.useState( 0.0 );
    const [JDA, setJDA]  = React.useState( 0.0 );
    const [JDB, setJDB]  = React.useState( 0.0 );
    const [cell, setCell]  = React.useState( '0' );

    const updateParameters = async()=>{
        console.log(iter + "/" + steps + "/" + temp + "/" + free + "/" + start + 
                    "/" + target + "/" + grid + "/" + J + "/" + JD + "/" + JAB + 
                    "/" + JA + "/" + JB + "/" + JDA + "/" + JDB + "/" + cell)
        props.getParameters({   iter: iter,     temp: temp,
                                free: free,     start: start,
                                target: target, steps: steps,
                                grid: grid,     J: J,
                                JD: JD,         JA: JA, 
                                JB: JB,         JAB: JAB,
                                JDA: JDA,       JDB: JDB,
                                cell:  cell})
    }

    const sendForm = async ()=>{
        setFetchStatus(true)
        await updateParameters()
        await props.send()
        setFetchStatus(false)
    }

    return (
        <Container style={styles.sidePanel}>
            <Typography style={styles.fromTop} align='center' variant='h4'> 
                 Wybór wariantu symulacji i jej atrybutów 
            </Typography>

            <Container style={styles.formsRow}>

                <FormControl style={styles.formControl}>
                    <FormLabel > 
                        <Typography variant='h5' align='center'> Temperatura </Typography> 
                    </FormLabel>
                    <RadioGroup style={ styles.radioGroup } 
                                value={ temp }
                                onChange={ (event) => { props.updateTemp(event.target.value); setTemp(event.target.value); } } >
                        <FormControlLabel value = { '0' } control={<Radio />} label="Stała" />
                        <FormControlLabel value = { '1' } control={<Radio />} label="Zmienna" />
                    </RadioGroup>
                </FormControl>

                {   temp === '0'    
                    ?  
                    <FormControl style={styles.formControl}>
                        <FormLabel > 
                            <Typography variant='h5' align='center'> Liczba iteracji </Typography> 
                        </FormLabel>
                        
                        <NativeSelect   value={iter}
                                        disabled = { temp === '1' ? true : false }
                                        onChange={ (event) => { setIter(event.target.value); }  } >
                            <option value = { 10 } > 10 </option>
                            <option value = { 100 } > 100 </option>
                            <option value = { 250 } > 250 </option>
                            <option value = { 500 } > 500 </option>
                            <option value = { 1000 } > 1000 </option>
                            <option value = { 2500 } > 1500 </option>
                            <option value = { 5000 } > 3000 </option>
                        </NativeSelect>
                    </FormControl>  
                    :   
                    <FormControl style = { styles.formControl } >
                        <FormLabel > 
                            <Typography variant = 'h5' align = 'center'> Skoki temperaturowe </Typography> 
                        </FormLabel>
                        
                        <NativeSelect   value={steps}
                                        disabled = { temp === '0' ? true : false }
                                        onChange={ (event) => { setSteps(event.target.value); }  } >
                            <option value = { 10 } > 10 </option>
                            <option value = { 20 } > 20 </option>
                            <option value = { 50 } > 50 </option>
                            <option value = { 100 } > 100 </option>
                            <option value = { 200 } > 200 </option>
                            <option value = { 500 } > 500 </option>
                            <option value = { 1000 } > 1000 </option>
                            <option value = { 2500 } > 2500 </option>
                        </NativeSelect>    
                    </FormControl>
                }
            </Container>


            <FormControl style={styles.formControl}>
                <FormLabel > 
                    <Typography variant='h5'> Stopnie swobody atomów </Typography> 
                </FormLabel>
                
                <NativeSelect   value={free}
                                onChange={ (event) => { setFree(event.target.value); }  } 
                                disabled = { cell === '1' ? true : false }>
                    <option value = { '1' } > Jeden </option>
                    <option value = { '2' } > Dwa </option>
                </NativeSelect>
            </FormControl>

            <FormControl style={styles.formControl}>
                <FormLabel > 
                    <Typography variant='h5'> Struktura siatki </Typography> 
                </FormLabel>
                
                <NativeSelect   value={cell}
                                onChange={ (event) => { setCell(event.target.value); }  } >
                    <option value = { '0' } > Kwadratowa </option>
                    <option value = { '1' } > Heksagonalna </option>
                </NativeSelect>
            </FormControl>

            { cell === '0' ? 
                <Container style={styles.formsRow}>
                    <Container>
                        <FormControl style={styles.formControl}>
                        <FormLabel > 
                            <Typography variant='h5' align='center'> J </Typography> 
                        </FormLabel>
                        <Slider style = { styles.integralSlider } 
                                getAriaValueText = { valuetext }
                                valueLabelDisplay = "auto" 
                                min = { -1.0 }  max = { 1.0 } step = {0.01}
                                marks = { integral_marks }
                                value = { J }
                                onChange={ (event) => {setJ(event.target.value); } } />
                            
                        </FormControl>
                    </Container>

                    <Container>
                        <FormControl style={styles.formControl}>
                        <FormLabel > 
                            <Typography variant='h5' align='center'> J <sub>d</sub> </Typography> 
                        </FormLabel>
                        <Slider style = { styles.integralSlider } 
                                getAriaValueText = { valuetext }
                                valueLabelDisplay = "auto" 
                                min = { -1.0 }  max = { 1.0 } step = {0.01}
                                marks = { integral_marks }
                                value = { JD }
                                onChange={ (event) => {setJD(event.target.value); } } />
                            
                        </FormControl>
                    </Container>
                </Container>

            :   <Container>
                    <Container style={styles.formsRow}>
                        <Container>
                            <FormControl style={styles.formControl}>
                            <FormLabel > 
                                <Typography variant='h5' align='center'> J<sub>ab</sub> </Typography> 
                            </FormLabel>
                            <Slider style = { styles.integralSlider } 
                                    getAriaValueText = { valuetext }
                                    valueLabelDisplay = "auto" 
                                    min = { -1.0 }  max = { 1.0 } step = {0.01}
                                    marks = { integral_marks }
                                    value = { JAB }
                                    onChange={ (event) => {setJAB(event.target.value); } } />
                                
                            </FormControl>
                        </Container>

                        <Container>
                            <FormControl style={styles.formControl}>
                            <FormLabel > 
                                <Typography variant='h5' align='center'> J<sub>a</sub> / J<sub>ab</sub>  </Typography> 
                            </FormLabel>
                            <Slider style = { styles.integralSlider } 
                                    getAriaValueText = { valuetext }
                                    valueLabelDisplay = "auto" 
                                    min = { -1.0 }  max = { 1.0 } step = {0.01}
                                    marks = { integral_marks }
                                    value = { JA }
                                    onChange={ (event) => {setJA(event.target.value); } } />
                                
                            </FormControl>
                        </Container>

                        <Container>
                            <FormControl style={styles.formControl}>
                            <FormLabel > 
                            <Typography variant='h5' align='center'> J<sub>b</sub> / J<sub>ab</sub>  </Typography>
                            </FormLabel>
                            <Slider style = { styles.integralSlider } 
                                    getAriaValueText = { valuetext }
                                    valueLabelDisplay = "auto" 
                                    min = { -1.0 }  max = { 1.0 } step = {0.01}
                                    marks = { integral_marks }
                                    value = { JB }
                                    onChange={ (event) => {setJB(event.target.value); } } />
                                
                            </FormControl>
                        </Container>
                    </Container>

                    <Container style={styles.formsRow}>
                        <Container>
                            <FormControl style={styles.formControl}>
                            <FormLabel > 
                                <Typography variant='h5' align='center'> J<sub>da</sub>  </Typography> 
                            </FormLabel>
                            <Slider style = { styles.integralSlider } 
                                    getAriaValueText = { valuetext }
                                    valueLabelDisplay = "auto" 
                                    min = { -1.0 }  max = { 1.0 } step = {0.01}
                                    marks = { integral_marks }
                                    value = { JDA }
                                    onChange={ (event) => {setJDA(event.target.value); } } />
                                
                            </FormControl>
                        </Container>

                        <Container>
                            <FormControl style={styles.formControl}>
                            <FormLabel > 
                                <Typography variant='h5' align='center'> J<sub>db</sub>  </Typography> 
                            </FormLabel>
                            <Slider style = { styles.integralSlider } 
                                    getAriaValueText = { valuetext }
                                    valueLabelDisplay = "auto" 
                                    min = { -1.0 }  max = { 1.0 } step = {0.01}
                                    marks = { integral_marks }
                                    value = { JDB }
                                    onChange={ (event) => {setJDB(event.target.value); } } />
                                
                            </FormControl>
                        </Container>
                    </Container>
                </Container>
                }

            
            <FormControl style={styles.formControl}>
                <FormLabel > 
                    <Typography variant='h5' align='center'> Temperatura początkowa </Typography> 
                </FormLabel>
                
                <Slider style = { styles.fromSlider } 
                        getAriaLabel = { () => 'Temperature' }
                        getAriaValueText = { valuetext }
                        valueLabelDisplay = "auto" 
                        min = { 0 }  max = { 10 } step = {0.01}
                        marks = { temperature_marks }
                        value = { start }
                        onChange={ (event) => {setStart(event.target.value); } } />
                    
            </FormControl>

            <FormControl style = { styles.formControl } >
                <FormLabel > 
                    <Typography variant = 'h5' align = 'center'> Temperatura końcowa </Typography> 
                </FormLabel>
                
                <Slider style = { styles.fromSlider } 
                        getAriaLabel = { () => 'Temperature' }
                        getAriaValueText = { valuetext }
                        valueLabelDisplay = "auto" 
                        min = { 0 }  max = { 10 } step = { 0.01 }
                        marks = { temperature_marks }
                        disabled = { temp === '0' ? true : false }
                        value = { target }
                        onChange={ (event) => {setTarget(event.target.value);  } } />
            </FormControl>

            <FormControl style={styles.formControl}>
                <FormLabel > 
                    <Typography variant='h5' align='center'> Rozmiar siatki </Typography> 
                </FormLabel>
                
                <Slider style={styles.fromSlider} 
                        getAriaLabel={() => 'Grid size'}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto" 
                        min={ cell === '0' ? 8 : 2 }  
                        max={cell === '0' ? 50 : 12 } 
                        step={1} marks={ cell === '0' ? grid_marks_sqrt : grid_marks_hex}
                        value = { grid }
                        onChange={ (event) => {setGrid(event.target.value); } } />
            </FormControl>

            <Stack direction="row" spacing = { 2 } style={styles.startButton}>
                <Button variant = "contained" 
                        disabled = { isFetching }
                        endIcon = { <PlayArrowIcon  /> } 
                        onClick = { sendForm }>
                    Wyślij
                </Button>
            </Stack>
        </Container >
    )

}


const valuetext= (value)=>{
    return `${value}K`;
  }

const styles = {
    fromTop:{
        borderBottom: 'solid 3px rgba(35, 55, 255, 1)',
        margin: '2px',
        padding: '1px',
    },
    sidePanel:{
        width: '400px',
        height: '1000px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        border: 'solid 2px blue',
        backgroundColor: 'rgba(235, 235, 255, 1)',
        color:  'rgba(5, 5, 5, 1)',
        justifyContent: 'space-between', 
    },
    formControl:{
        margin: '2px',
        padding: '1px'
    },
    radioGroup:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
    },
    fromSlider:{
        height: '8px',
        width: '360px',
    },
    startButton:{
        margin: '2px',
        padding: '1px'
    },
    integralSlider:{
        height: '4px',
        width: '80px',
    },
    formsRow:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
}

const temperature_marks = [
    {
      value: 0,
      label: '0K',
    },
    {
      value: 5,
      label: '5K',
    },
    {
      value: 10,
      label: '10K',
    },
  ];

const grid_marks_sqrt = [
    {
      value: 8,
      label: '8',
    },
    {
      value: 50,
      label: '50',
    },
];

const grid_marks_hex = [
    {
      value: 2,
      label: '2',
    },
    {
      value: 12,
      label: '12',
    },
];

const integral_marks = [
    {
        value: -1.0,
        label: '-1',
    },
    {
        value: 1.0,
        label: '1',
    },
];
