const StartButton = ({ running, stopTimer, startTimer }) => {
  return (
    <>
      {!running ? (
        <button id="start_stop" onClick={stopTimer}>
          <i class="fa-regular fa-circle-pause"></i>
        </button>
      ) : (
        <button id="start_stop" onClick={startTimer}>
          <i class="fa-regular fa-stopWatch"></i>
        </button>
      )}
    </>
  );
};

export default StartButton;
