import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import dataSource from './utils/PadsSources.json';
import Button from '@mui/material/Button';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pads from './components/pads';
import EventEmitter from './utils/EventEmitter';
import './App.css';


function App() {
  const [play , setPlay]  = useState(true);
  const [pause, setPause] = useState(false);

  function stopLoop(){
    setPlay(!play);
    setPause(!pause);
    EventEmitter.emit('StopLoop',{})
  }

  function startLoop(){
    setPause(!pause);
    setPlay(!play);
    EventEmitter.emit('StartLoop',{})
  }

  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pad Loops
          </Typography>
        </Toolbar>
      </AppBar>

      <div className='padsContainer'>
        <div className="pads">
          {dataSource.sources.map((src,index) => (
            <Pads source={src} index={index} key={index} />
          ))}

          <div className="actions">
            {
              play ? <Button className='customButton' variant="contained" color="success" startIcon={<PlayArrowIcon />} onClick={startLoop}>Play</Button>
                : <Button className='customButton' variant="contained" disabled startIcon={<PlayArrowIcon />} onClick={startLoop}>Play</Button>
            }

            {
              pause ? <Button className='customButton' variant="contained" color="error" startIcon={<PauseIcon />} onClick={stopLoop}>Pause</Button>
                : <Button className='customButton' variant="contained" disabled color="error" startIcon={<PauseIcon />} onClick={stopLoop}>Pause</Button>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
