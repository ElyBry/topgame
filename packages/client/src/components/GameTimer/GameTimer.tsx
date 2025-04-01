import styles from "./GameTimer.module.css";
import React, {useEffect, useState} from "react";

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
    const minutes = Math.floor(seconds / 60);
    const lastSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${lastSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className={styles.timerContainer}>
      {isActive && "Ваш ход"}
      <div className={styles.timer}>{formatTime(seconds)}</div>
    </div>
  )
}

export default GameTimer;
