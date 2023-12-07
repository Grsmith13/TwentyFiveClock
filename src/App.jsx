import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faStopwatch,
  faCirclePause,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [timeS, setTimeS] = useState({
    time: 1500,
    running: false,
    break: false,
  });

  const timerId = useRef(false);
  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  const stopTimer = () => {
    clearInterval(timerId.current);
    setTimeS((prevState) => ({
      time: prevState.time,
      status: false,
      break: prevState.break,
    }));
    clearInterval(timerId.current);
    // timerId.current = 0;
  };

  const Timer = () => {
    if (!timeS.running) {
      timerId.current = setInterval(() => {
        setTimeS((prevState) => {
          if (prevState.time <= 0) {
            let alrt = document.getElementById("beep");
            alrt.play();
            if (prevState.break) {
              return {
                ...timeS,
                time: sessionTime * 60,
                running: true,
                break: false,
              };
            } else {
              return { ...timeS, time: breakTime * 60, on: true, break: true };
            }
          } else {
            return {
              ...timeS,
              time: prevState.time - 1,
              running: true,
              break: prevState.break,
            };
          }
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(timerId.current);
    let alrt = document.getElementById("beep");
    alrt.pause();
    alrt.currentTime = 0;
    setTimeS({
      ...timeS,
      time: 1500,
      running: false,
      break: false,
    });

    setSessionTime(25);
    setBreakTime(5);
  };

  const sessionIncrease = () => {
    if (sessionTime < 60) {
      setSessionTime((state) => {
        return state + 1;
      });
      setTimeS({
        ...timeS,
        time: (sessionTime + 1) * 60,
        running: false,
        break: false,
      });
    }
  };

  const sessionDecrease = () => {
    if (sessionTime > 1) {
      setSessionTime((state) => {
        return state - 1;
      });
      setTimeS({
        ...timeS,
        time: (sessionTime - 1) * 60,
        running: false,
        break: false,
      });
    }
  };
  const BreakIncrease = () => {
    if (breakTime >= 60) return;
    setBreakTime((prevBreakTime) => {
      const newBreakTime = prevBreakTime + 1;

      return newBreakTime;
    });
  };

  const BreakDecrease = () => {
    if (breakTime > 1) {
      setBreakTime((prevBreakTime) => {
        const newBreakTime = prevBreakTime - 1;
        return newBreakTime;
      });
    }
  };

  return (
    <div className="clock">
      <section className="time">
        <h2>TIMER</h2>
        <h3 id="time-left">{getFormattedTime(timeS.time)}</h3>
        {timeS.running ? (
          <button id="start_stop" onClick={stopTimer}>
            <FontAwesomeIcon icon={faCirclePause} />
          </button>
        ) : (
          <button id="start_stop" onClick={Timer}>
            <FontAwesomeIcon icon={faStopwatch} />
          </button>
        )}
        <button id="reset" onClick={resetTimer}>
          <FontAwesomeIcon icon={faClockRotateLeft} />
        </button>
      </section>
      <div className="session-break">
        <section className="session">
          <p id="session-label">Session Length</p>
          <button id="session-increment" onClick={sessionIncrease}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <div id="session-length">{sessionTime}</div>

          <button id="session-decrement" onClick={sessionDecrease}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </section>
        <div id="timer-label">{timeS.break ? "Break" : "Session"}</div>
        <section className="breakSection">
          <div id="break-label">break Length</div>
          <button id="break-increment" onClick={BreakIncrease}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <p id="break-length">{breakTime}</p>
          <button id="break-decrement" onClick={BreakDecrease}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </section>
      </div>
      <audio
        id="beep"
        src="https://www.soundjay.com/misc/sounds/magic-chime-05.mp3"
      />
    </div>
  );
}

function padZero(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString.length) + numberString;
}

const getFormattedTime = (milSeconds) => {
  let minutes = parseInt(Math.floor(milSeconds / 60));
  let seconds = parseInt(milSeconds % 60);

  return `${padZero(minutes, 2)}:${padZero(seconds, 2)}`;
};

export default App;
