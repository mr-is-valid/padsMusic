import {useEffect , useState} from 'react';
import EventEmitter from '../utils/EventEmitter';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {Howl} from 'howler';
import '../css/pads.css';

interface Props {
  source: string,
  index: number
}


const Pads = ({source,index}: Props) => {
  
  const sound = new Howl({
    src: [source],
    autoplay: false,
    html5: true,
    loop: false,

    onend: function(){
      sound.play();
      EventEmitter.emit('PlayNextSong',{ data: index + 1});
    },

    onplay: function(){ isPlay(); },

    onpause: function(){
      sound.stop();
    },

    onstop: function(){
      sound.stop();
    },
  });


  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const vertical = 'bottom';
  const horizontal = 'center';

  const handleClose = () => {
    setOpenSnackbar(false);
  };


  //*********** GLOBAL UseEFFECT FOR MAIN LOOP **********/
  // LISENT TO EVENT FROM MAIN LOOP AND STOP ALL SONGS *//
  useEffect(() => {
    const startLoop = () =>{ isPlay(); }

    const listener = EventEmitter.addListener('StartLoop',startLoop);
    return () => {
      listener.remove();
    }
  },[]);

  
  //*********** GLOBAL UseEFFECT FOR MAIN LOOP **********/
  // LISENT TO EVENT FROM MAIN LOOP AND PLAY ALL SONGS *//
  useEffect(() => {
    const stopLoop = () =>{ sound.stop(); }

    const listener = EventEmitter.addListener('StopLoop',stopLoop);
    return () => {
      listener.remove();
    }
  },[]);


  //*********** UseEFFECT FOR PLAY NEXT SONG **********/
  // LISENT TO EVENT WITH THE NEXT ID OF THE SONG ****//
  // CHECK IF THE ID IS EQUAL TO SELF ID AND THEN  ***//
  // PLAY THE SONG , THE PREVIUSE SONG CONTINUE PLAY *//
  useEffect(() => {
    const playNextSong = (eventData: any) =>{
      if(eventData.data === index){
        sound.play();
      }
    }

    const listener = EventEmitter.addListener('PlayNextSong',playNextSong);
    return () => {
      listener.remove();
    }
  },[]);


  function needToPlay(){
    if(index === 0) sound.play();
    else setOpenSnackbar(true);
  }

  
  function isPlay(){
    if(!sound.playing()){
      sound.play();
    }
  }


  return (
    <>
    <div className="padsTitle">
        <p><b><u>Record - {(index + 1)}</u></b></p>
        <div className="actionsBtns">
          <Button className='customButton' size="small" variant="contained" startIcon={<PlayArrowIcon />} onClick={()=>{needToPlay()}}>Play</Button>
          <Button className='customButton' size="small" variant="contained" color="error" startIcon={<PauseIcon />} onClick={()=>{sound.stop()}}> Pause</Button>
          
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnackbar}
            onClose={handleClose}
            message="this record will Start play when the main loop start or click on record 1 start"
            key={vertical + horizontal}
            action={
              <>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  sx={{ p: 0.5 }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </>
            }
          />
        </div>
    </div>
    </>
  );
}

export default Pads;
