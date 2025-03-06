import React, { useState, useRef } from "react";
import "./App.css";

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
        setElapsed((now - startTimeRef.current) / 1000);
      }, 10);

      // Hide the timer after 3 seconds (but let it keep running in the background)
      setTimeout(() => {
        setShowTimer(false);
      }, 3000);
    } else if (stage === "running") {
      // Second click: Stop the timer and record the final time.
      clearInterval(timerRef.current);
      const now = Date.now();
      const timeElapsed = (now - startTimeRef.current) / 1000;
      setFinalTime(timeElapsed);
      setStage("finished");
    } else if (stage === "finished") {
      // Reset the game to play again.
      setStage("waiting");
      setElapsed(0);
      setFinalTime(null);
    }
  };

  // Calculate the difference from 10 seconds (absolute difference)
  const difference = finalTime !== null ? Math.abs(finalTime - 10) : null;

  return (
      <div className="final-round-game" >
        <h1>Final Round</h1>
        <button className="red-button" onClick={handleButtonClick}>
          {stage === "waiting" && "Start"}
          {stage === "running" && "Stop"}
          {stage === "finished" && "Reset"}
        </button>

        {/* Display the timer for the first 3 seconds only */}
        {stage !== "waiting" && showTimer && (
          <div className="timer-display">
            <p>{elapsed.toFixed(2)} seconds</p>
          </div>
        )}

        {/* When finished, show the final time and difference from 10 seconds */}
        {stage === "finished" && (
          <div className="final-result">
            <p>Final Time: {finalTime.toFixed(2)} seconds</p>
            <p>Difference from 10 seconds: {difference.toFixed(2)} seconds</p>
          </div>
        )}
      </div>
  );
}
