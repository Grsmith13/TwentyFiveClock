const StartButton = ({ running, stopTimer, startTimer }) => {
  return (
    <>
      {!running ? (
        <button id="start_stop" onClick={stopTimer}>
          pause
        </button>
      ) : (
        <button id="start_stop" onClick={startTimer}>
          start
        </button>
      )}
    </>
  );
};

export default StartButton;
