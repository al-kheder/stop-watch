import React, { useState, useRef } from "react";
import "../App.css";
export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours}:${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${
      milliseconds < 10 ? "0" : ""
    }${milliseconds}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <button onClick={startStopwatch}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}
