import { useRef, useState } from "react";

const Timer = ({ duration }) => {
  const [time, setTime] = useState(duration * 60 * 1000);
  const timerId = useRef();

  const startTimer = () => {
    timerId.current = setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  return (
    <section>
      <div>{getFormattedTime(time)}</div>

      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>pause</button>
      <button onClick={stopTimer}>reset</button>
    </section>
  );
};

function padZero(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString.length) + numberString;
}

const getFormattedTime = (milSeconds) => {
  let totalSeconds = parseInt(Math.floor(milSeconds / 1000));
  let totalMinutes = parseInt(Math.floor(totalSeconds / 60));

  let seconds = parseInt(totalSeconds % 60);
  let minutes = parseInt(totalMinutes % 60);
  return ` ${padZero(minutes, 2)}: ${padZero(seconds, 2)}`;
};

export default Timer;
