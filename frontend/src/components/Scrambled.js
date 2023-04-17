import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../assets/FastSupperPainting.jpg';
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import '../Scrambled.css';
const Scrambled = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     audioRef.current.play();
//   }, []);

  const handelClick = () =>
  {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
        audioRef.current.currentTime = 0; // sets the audio to the beginning
        audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        background: `url(${backgroundImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
      }}
    > 
      <header className="welcome-header">
        <h1 className="welcome-header-title">WELCOME TO PARADISE</h1>
      </header>
      <audio ref={audioRef} src="https://www.hallelujah-chorus.com/audio/hallelujah-chorus-9MB.mp3"></audio>
      <Button color="primary" id="redirectBack" onClick={() => {navigate('/home')}}>Go back to APP</Button>
      <Button color="primary" id="stopMusic" onClick={handelClick}>{isPlaying ? 'Stop' : 'Play'} Music</Button>
    </div>
  );
};

export default Scrambled;
