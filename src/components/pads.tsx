import {useEffect, useRef} from 'react';
import EventEmitter from '../utils/EventEmitter';
import '../css/pads.css';

interface Props {
  source: string
}

const Pads = ({source}: Props) => {

  useEffect(() => {
    const startLoop = () =>{
      (audRef.current as any).currentTime = 0;
      (audRef.current as any).play();
    }

    const listener = EventEmitter.addListener('StartLoop',startLoop)
    return () => {
      listener.remove();
    }
  },[])


  useEffect(() => {
    const stopLoop = () =>{
      (audRef.current as any).pause();
    }

    const listener = EventEmitter.addListener('StopLoop',stopLoop)
    return () => {
      listener.remove();
    }
  },[])

  const audRef = useRef(null);

  return (
    <audio autoPlay={true} controls={true} muted={false}
           loop={true} ref={audRef} className='audioPad'>
      <source src={source} type="audio/mp3"/>
    </audio>
  );
}

export default Pads;
