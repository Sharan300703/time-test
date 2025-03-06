import React, { useState, useRef } from "react";
import "./App.css";
import Squares from './components/Squares';



export default function App() {
  // Stage can be: "waiting" (before first click), "running", "finished"
  const [stage, setStage] = useState("waiting");
  const [elapsed, setElapsed] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [finalTime, setFinalTime] = useState(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleButtonClick = () => {
    if (stage === "waiting") {
      // First click: Start the timer.
      startTimeRef.current = Date.now();
      setStage("running");
      setShowTimer(true);

      // Update elapsed time every 10ms
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const timeElapsed = 10 + ((startTimeRef.current - now) / 1000);
        setElapsed(timeElapsed);
        console.log(timeElapsed);
        if (timeElapsed < 0) {
          clearInterval(timerRef.current);
          alert("The timer hit zero! Too slow ;)");
          setFinalTime(-1);
          setStage("finished");
          return;
        }
      }, 10);
      // Hide the timer after 3 seconds (but let it keep running in the background)
      setTimeout(() => {
        setShowTimer(false);
      }, 3000);
    } if (stage === "running") {
      // Second click: Stop the timer and record the final time.
      clearInterval(timerRef.current);
      const now = Date.now();
      const timeElapsed = 10 + ((startTimeRef.current - now) / 1000);
      setFinalTime(timeElapsed);
      setStage("finished");
    } if (stage === "finished") {
      // Reset the game to play again.
      setStage("waiting");
      setElapsed(0);
      setFinalTime(null);
    }
  };

  // Calculate the difference from 10 seconds (absolute difference)
  const difference = finalTime !== null ? (finalTime - 10) : null;

  return (
      <div className="final-round-game">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#FF49495F'
          hoverFillColor='#222'
          />
        <div className="page-content">
          <div className="page-title">The Countdown</div>
          <div className="red-button" onClick={handleButtonClick}>
            {stage === "waiting" && "Start"}
            {stage === "running" && "Stop"}
            {stage === "finished" && "Reset"}
          </div>

          {/* Display the timer for the first 3 seconds only */}
          {stage !== "waiting" && showTimer && (
            <div className="timer-display">
              <p className="elapsed-time">{elapsed.toFixed(2)} seconds</p>
            </div>
          )}

          {/* When finished, show the final time and difference from 10 seconds */}
          {stage === "finished" && (
            <div className="final-result">
              <p className="stop-time">Stop Time: {finalTime.toFixed(3)} seconds</p>
              <p className="final-score">Final Score = {difference.toFixed(3)} </p>
            </div>
          )}
        </div>
        </div>
  );
}
