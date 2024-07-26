import React, { useState, useEffect } from 'react';
import '../styles/Timer.css';

const Timer = ({ initialMinutes = 0, initialSeconds = 0, onTimeUp }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let timerInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    onTimeUp(); 
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [minutes, seconds, onTimeUp]);

    return (
        <div className="timer-container">
            <div className="timer-text">
                {minutes === 0 && seconds === 0
                    ? 'Time is up!'
                    : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </div>
        </div>
    );
};

export default Timer;
