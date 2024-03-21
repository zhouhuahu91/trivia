import { useState, useEffect, useRef } from "react";
import { useGameState } from "../context/gameStateContext";

const Questions = () => {
  const {
    gameState: { questions },
    dispatch,
  } = useGameState();
  const [currentQ, setCurrentQ] = useState(0);
  const [showQ, setShowQ] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [active, setActive] = useState(false);

  const audioRef = useRef(new Audio("/trivia_jingle.mp3"));

  const startJingle = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopJingle = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the start
    }
  };

  const reset = () => {
    setShowQ(false);
    setShowAnswer(false);
    setSecondsLeft(30);
    setActive(false);
    stopJingle();
  };

  useEffect(() => {
    let interval = null;

    if (active && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setActive(false);
      setSecondsLeft(30);
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [secondsLeft, active]);

  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <div className="flex w-full justify-between items-center max-w-3xl min-w-60">
        <button
          onClick={() => {
            if (currentQ === 0) {
              return dispatch({ type: "GO_TO_ROUNDS" });
            }
            reset();
            setCurrentQ((prev) => prev - 1);
          }}
          className="material-symbols-outlined"
        >
          arrow_back
        </button>
        <h1 className="text-lg font-medium">Vraag {currentQ + 1}</h1>
        <button
          onClick={() => {
            if (currentQ + 1 === questions.length) {
              return dispatch({ type: "GO_TO_ROUNDS" });
            }
            reset();
            setCurrentQ((prev) => prev + 1);
          }}
          className="material-symbols-outlined"
        >
          arrow_forward
        </button>
      </div>
      {questions.length > 9 && (
        <>
          <button
            onClick={() => setShowQ((prev) => !prev)}
            className={`text-5xl text-center font-medium max-w-7xl ${
              !showQ && "blur-lg"
            }`}
          >
            {questions[currentQ].question}
          </button>
          <button
            disabled={!showQ}
            onClick={() => setShowAnswer((prev) => !prev)}
            className={`text-3xl text-center ${!showAnswer && "blur-lg"}`}
          >
            {questions[currentQ].answer}
          </button>
          <button
            onClick={() => {
              if (active) {
                stopJingle();
                setSecondsLeft(30);
              } else {
                startJingle();
              }
              setActive((prev) => !prev);
            }}
            className={`text-6xl font-medium font-mono mb-4`}
          >
            {active ? (
              secondsLeft
            ) : (
              <span className="material-symbols-outlined text-6xl">timer</span>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default Questions;
