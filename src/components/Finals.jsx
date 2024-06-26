import { useState, useEffect, useRef } from "react";
import { useGameState } from "../context/gameStateContext";

const Finals = () => {
  const { gameState, dispatch } = useGameState();
  const {
    finalistOne,
    finalistTwo,
    trivia: { finale },
  } = gameState;
  const [turn, setTurn] = useState(false);
  const [showQ, setShowQ] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [bothHadATurn, setBothHadATurn] = useState(false);

  const answeredAll =
    answers.length === finale.questions[currentQ].answers.length;

  const clockAudio = useRef(new Audio("/clock.mp3"));
  const tensionAudio = useRef(new Audio("/tension.mp3"));
  const correctAudio = useRef(new Audio("/correct.mp3"));
  const winnerAudio = useRef(new Audio("/winner.mp3"));

  const startAudio = () => {
    if (clockAudio.current) {
      clockAudio.current.loop = true;
      clockAudio.current.play();
    }
    if (tensionAudio.current) {
      tensionAudio.current.loop = true;
      tensionAudio.current.volume = 0.2;
      tensionAudio.current.play();
    }
  };

  const stopAudio = () => {
    if (clockAudio.current) {
      clockAudio.current.pause();
      clockAudio.current.currentTime = 0; // Reset the audio to the start
    }
    if (tensionAudio.current) {
      tensionAudio.current.pause();
      tensionAudio.current.currentTime = 0; // Reset the audio to the start
    }
  };

  const reset = () => {
    setTurn(false);
    setShowQ(false);
    setAnswers([]);
    setBothHadATurn(false);
  };

  useEffect(() => {
    if (turn !== false) {
      startAudio();
    } else {
      stopAudio();
    }

    return () => {
      stopAudio();
    };
  }, [turn]);

  const startWinnerAudio = () => {
    if (winnerAudio.current) {
      winnerAudio.current.loop = true;
      winnerAudio.current.play();
    }
  };

  const stopWinnerAudio = () => {
    if (winnerAudio.current) {
      winnerAudio.current.pause();
      winnerAudio.current.currentTime = 0; // Reset the audio to the start
    }
  };

  useEffect(() => {
    if (finalistOne?.score === 0 || finalistTwo?.score === 0) {
      startWinnerAudio();
    }

    return () => stopWinnerAudio();
  }, [finalistOne, finalistTwo]);

  useEffect(() => {
    if (finalistOne === null || finalistTwo === null) {
      dispatch({ type: "GET_FINALISTS" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval = null;

    if (
      turn !== false &&
      // If all answers are shown we stop the time.
      answers.length < finale.questions[currentQ].answers.length &&
      finalistOne.score > 0 &&
      finalistTwo.score > 0
    ) {
      interval = setInterval(() => {
        if (turn === 0) {
          dispatch({
            type: "REMOVE_POINT_FINALIST_ONE",
          });
        } else if (turn === 1) {
          dispatch({
            type: "REMOVE_POINT_FINALIST_TWO",
          });
        }
      }, 1000);
    } else {
      setTurn(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [turn, answers, finale, currentQ, dispatch, finalistOne, finalistTwo]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <button
        onClick={() =>
          dispatch({
            type: "GO_TO_ROUNDS",
          })
        }
        className="flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="text-xl font-medium">Terug</span>
      </button>
      <button
        onClick={() => {
          dispatch({ type: "GET_FINALISTS" });
        }}
        className="text-7xl font-bold tracking-widest text-main  mt-5 italic"
      >
        FINALE!
      </button>
      {finalistOne !== null && finalistTwo !== null && (
        <div className="flex gap-40 items-center">
          <button
            disabled={!showQ}
            onClick={() => {
              setTurn(0);
            }}
            className={`capitalize border p-8 rounded-lg w-60 flex flex-col items-center justify-center gap-6 ${
              turn === 0 ? "text-main shadow-inner bg-neutral-50" : "shadow-xl"
            }`}
          >
            <span className="text-lg font-medium text-inherit">
              {finalistOne.name}
            </span>
            <span className="text-7xl font-medium font-mono text-inherit">
              {finalistOne.score}
            </span>
          </button>
          <span className="italic text-3xl">VS</span>
          <button
            disabled={!showQ}
            onClick={() => {
              setTurn(1);
            }}
            className={`capitalize border p-8 rounded-lg w-60 flex flex-col items-center justify-center gap-6 ${
              turn === 1 ? "text-main shadow-inner bg-neutral-50" : "shadow-xl"
            }`}
          >
            <span className="text-xl font-medium text-inherit">
              {finalistTwo.name}
            </span>
            <span className="text-7xl font-medium font-mono text-inherit">
              {finalistTwo.score}
            </span>
          </button>
        </div>
      )}
      <button
        onClick={() => {
          setShowQ(true);
        }}
        className={`text-5xl text-center font-medium max-w-7xl ${
          !showQ && "blur-lg"
        }`}
      >
        {finale.questions[currentQ].question}
      </button>
      <div className="flex gap-20 mt-10">
        {finale.questions[currentQ].answers.map((answer, idx) => {
          return (
            <button
              disabled={
                showQ === false || (turn === false && bothHadATurn === false)
              }
              onClick={() => {
                if (answers.includes(answer)) return;
                setAnswers((prev) => [...prev, answer]);
                if (correctAudio.current) {
                  correctAudio.current.volume = 0.4;
                  correctAudio.current.play();
                }
                for (let i = 0; i < 20; i++) {
                  setTimeout(() => {
                    if (turn === 0) {
                      dispatch({
                        type: "REMOVE_POINT_FINALIST_TWO",
                      });
                    } else if (turn === 1) {
                      dispatch({
                        type: "REMOVE_POINT_FINALIST_ONE",
                      });
                    }
                  }, 5 * i);
                }
              }}
              className={`text-2xl ${!answers.includes(answer) && "blur"}`}
              key={idx}
            >
              {answer}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4">
        {turn !== false && (
          <button
            onClick={() => {
              if (bothHadATurn === false) {
                setTurn((prev) => {
                  if (prev === 0) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
                setBothHadATurn(true);
              } else {
                setTurn(false);
              }
            }}
            className="flex items-center border p-2 rounded-md gap-2 bg-red-400 text-white w-40 justify-center"
          >
            Pas
            <span className="material-symbols-outlined text-white">timer</span>
          </button>
        )}
        {turn === false && !bothHadATurn && !answeredAll && (
          <button
            onClick={() => {
              if (!showQ) {
                return setShowQ(true);
              }
              if (finalistOne.score > finalistTwo.score) {
                setTurn(1);
              } else {
                setTurn(0);
              }
            }}
            className="flex items-center border p-2 rounded-md gap-2 bg-main text-white w-40 justify-center"
          >
            {showQ ? "Start" : "Vraag"}
            <span className="material-symbols-outlined text-white">
              {showQ ? "timer" : "visibility"}
            </span>
          </button>
        )}
        {(bothHadATurn || answeredAll) && turn === false && (
          <button
            onClick={() => {
              if (currentQ + 1 === finale.questions.length) {
                reset();
                return setCurrentQ(0);
              }
              setCurrentQ((prev) => prev + 1);
              reset();
            }}
            className="border p-2 flex items-center rounded-md shadow-xl bg-main text-white gap-2 w-40 justify-center"
          >
            Volgende
            <span className="material-symbols-outlined text-white">
              arrow_forward
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Finals;
