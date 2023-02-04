import SimulationPanel from './components/SimulationPanel';
import Discription from './components/Description';
import Footer from './components/Footer';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import SimulateAPI from './SimulateAPI';
import React from 'react';
import AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/system/Container';

const App = () => {
  return (
    <div style={styles.root}>
      <CssBaseline />
      <AppBar position='relative' style={styles.toolBar}>
        <Toolbar>
          <Typography variant='h2'>
            Symulacje układów magentycznych
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Discription style={styles.desc} />

      <Container maxWidth='xl' style={styles.body}>
        <SimulationPanel simulateApi={new SimulateAPI('http://localhost:8080') }/>
      </Container>

      <Footer />
    </div>
  );
}


const styles = {
  root:{
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: 'rgb(0,0,0) linear-gradient(95deg, rgba(0,0,0,1) 49%, rgba(21,10,71,1) 84%, rgba(69,9,3,1) 100%)'
  },
  toolBar: {
    padding: '15px',
    alignItems: 'center',
    },
  body:{
    padding: '15px',
    backgroundColor: 'white',
    display: 'flex',
    width: '1800px'
  },
 
}

export default App;