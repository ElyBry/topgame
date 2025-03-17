import React, {useEffect, useState} from "react";
import styled from 'styled-components'

interface GameTimerProps {
  initialSeconds: number;
  active: boolean;
}

const GameTimer:React.FC<GameTimerProps> = ({ initialSeconds, active}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor((seconds / 60) % 60);
    const lastSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${lastSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <TimerContainerStyle>
      {isActive && "Ваш ход"}
      <TimerStyle>{formatTime(seconds)}</TimerStyle>
    </TimerContainerStyle>
  )
}

const TimerContainerStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Arial", sans-serif;
    background-color: #ffffff;
    color: #000000;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TimerStyle = styled.div`
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 2px;
`;

export default GameTimer;
