import React, { useState, useEffect } from 'react';
import './styles/fonts.css';
import styles from './styles/timer.css';	

function Timer() {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const focusDuration = parseInt(urlParams.get('focus')) * 60 || 25 * 60;
  const breakDuration = parseInt(urlParams.get('break')) * 60 || 5 * 60;
  const initialReps = parseInt(urlParams.get('reps')) || 4;
  const color = decodeURIComponent(urlParams.get('color')) || '#000000';
  const timerFont = urlParams.get('timerFont') || 'VT323';
  const sessionFont = urlParams.get('sessionFont') || 'VT323';
  const alignment = urlParams.get('alignment') || 'left';

  // State variables
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [intervalId, setIntervalId] = useState(null);
  const [label, setLabel] = useState('Focus');
  const [reps, setReps] = useState(initialReps);

  // Timer update function
  const updateTimer = () => {
    if (timeLeft >= 0) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return '00:00';
  };

  useEffect(() => {
    if (timeLeft < 0) {
      clearInterval(intervalId);
      if (label === 'Get ready') {
        setLabel('Focus');
        setTimeLeft(focusDuration);
        setIntervalId(setInterval(tick, 1000));
      } else if (label === 'Focus') {
        if (reps > 1) {
          setLabel('Break');
          setTimeLeft(breakDuration);
          setReps((prevReps) => prevReps - 1);
          setIntervalId(setInterval(tick, 1000));
        } else {
          setLabel('Well');
        }
      } else if (label === 'Break') {
        setLabel('Focus');
        setTimeLeft(focusDuration);
        setIntervalId(setInterval(tick, 1000));
      }
    }
  }, [timeLeft, label]);

  const tick = () => {
    setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
  };

  const handleClick = () => {
    if (!intervalId) {
      setLabel('Get ready');
      setTimeLeft(10);
      setIntervalId(setInterval(tick, 1000));
    }
  };

  return (
    <div className="body" style={{ textAlign: alignment, backgroundColor: 'white'}}>
      <p
        id="label"
        style={{
          color: color,
          fontSize: '33px',
          marginBottom: '-20px',
          marginLeft: '10px',
          marginRight: '10px',
          fontFamily: sessionFont,
        }}
      >
        {label}
      </p>
      <p
        id="timer"
        style={{ fontSize: '100px', marginTop: '0px', cursor: 'pointer', fontFamily: timerFont }}
        onClick={handleClick}
      >
        {label === 'Well' ? 'DONE!' : updateTimer()}
      </p>
    </div>
  );
}

export default Timer;
