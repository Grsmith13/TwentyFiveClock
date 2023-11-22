import { useEffect, useRef, useState } from "react";
import "./App.css";
import StartButton from "./components/StartButton";
// The Timer function and timeS variable were based on Vladimir Samsonov code for their project as they were having similar issues.
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
    <>
      <section>
        <div id="time-left">{getFormattedTime(timeS.time)}</div>
        {timeS.running ? (
          <button id="start_stop" onClick={stopTimer}>
            pause
          </button>
        ) : (
          <button id="start_stop" onClick={Timer}>
            start
          </button>
        )}
        <button id="reset" onClick={resetTimer}>
          reset
        </button>
      </section>
      <section>
        <p id="session-label">Session Length</p>
        <div id="session-length">{sessionTime}</div>
        <button id="session-increment" onClick={sessionIncrease}>
          up
        </button>
        Session
        <button id="session-decrement" onClick={sessionDecrease}>
          down
        </button>
      </section>
      <section>
        <div id="break-label">breakActive Length</div>
        <p id="break-length">{breakTime}</p>
        <button id="break-increment" onClick={BreakIncrease}>
          up
        </button>
        breakActive
        <button id="break-decrement" onClick={BreakDecrease}>
          down
        </button>
      </section>
      <div id="timer-label">{timeS.break ? "Break" : "Session"}</div>
      <audio
        id="beep"
        src="https://www.soundjay.com/misc/sounds/magic-chime-05.mp3"
      />
    </>
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

