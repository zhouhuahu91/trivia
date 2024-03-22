import { useState, useEffect } from "react";
import { useGameState } from "../context/gameStateContext";

const Finals = () => {
  const {
    gameState: { finalists, trivia },
    dispatch,
  } = useGameState();
  const [turn, setTurn] = useState(false);
  const [showQ, setShowQ] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [bothHadATurn, setBothHadATurn] = useState(false);

  const reset = () => {
    setTurn(false);
    setShowQ(false);
    setAnswers([]);
    setBothHadATurn(false);
  };

  useEffect(() => {
    let interval = null;
    const scoreMoreThanZero = finalists.every((player) => player.score > 0);
    if (
      turn !== false &&
      finalists.length > 1 &&
      // If all answers are shown we stop the time.
      answers.length < trivia.final.questions[currentQ].answers.length &&
      scoreMoreThanZero
    ) {
      interval = setInterval(() => {
        dispatch({
          type: "REMOVE_POINT_FINALIST",
          payload: finalists[turn].name,
        });
      }, 1000);
    } else {
      setTurn(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [turn, finalists, answers, trivia, currentQ]);

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
      {finalists.length === 2 && (
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
              {finalists[0].name}
            </span>
            <span className="text-7xl font-medium font-mono text-inherit">
              {finalists[0].score}
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
              {finalists[1].name}
            </span>
            <span className="text-7xl font-medium font-mono text-inherit">
              {finalists[1].score}
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
        {trivia.final.questions[currentQ].question}
      </button>
      <div className="flex gap-20 mt-10">
        {trivia.final.questions[currentQ].answers.map((answer) => {
          return (
            <button
              disabled={
                showQ === false || (turn === false && bothHadATurn === false)
              }
              onClick={() => {
                if (answers.includes(answer)) return;
                setAnswers((prev) => [...prev, answer]);
                for (let i = 0; i < 20; i++) {
                  dispatch({
                    type: "REMOVE_POINT_FINALIST",
                    payload: turn === 0 ? finalists[1].name : finalists[0].name,
                  });
                }
              }}
              className={`text-2xl ${!answers.includes(answer) && "blur"}`}
              key={answer}
            >
              {answer}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4">
        {turn !== false ? (
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
            {bothHadATurn ? "Stop" : "Pas"}
            <span className="material-symbols-outlined text-white">timer</span>
          </button>
        ) : (
          <button
            disabled={!showQ}
            onClick={() => {
              const player1 = finalists[0].score;
              const player2 = finalists[1].score;
              if (player1.score > player2.score) {
                setTurn(0);
              } else {
                setTurn(1);
              }
            }}
            className="flex items-center border p-2 rounded-md gap-2 bg-red-400 text-white w-40 justify-center"
          >
            Start
            <span className="material-symbols-outlined text-white">timer</span>
          </button>
        )}
        <button
          onClick={() => {
            if (currentQ + 1 === trivia.final.questions.length) {
              reset();
              return setCurrentQ(0);
            }
            setCurrentQ((prev) => prev + 1);
            reset();
          }}
          className="border p-2 flex items-center rounded-md shadow-xl gap-2 text-white bg-main w-40 justify-center"
        >
          Volgende
          <span className="material-symbols-outlined text-white">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};

export default Finals;
