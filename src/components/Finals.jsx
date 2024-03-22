import { useState } from "react";
import { useGameState } from "../context/gameStateContext";

const Finals = () => {
  const [showFinalists, setShowFinalists] = useState(false);
  const {
    gameState: { finalists },
    dispatch,
  } = useGameState();
  const [turn, setTurn] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
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
          setShowFinalists(true);
        }}
        className="text-7xl font-bold tracking-widest text-main mb-10 mt-5 italic"
      >
        FINALE!
      </button>
      {finalists.length === 2 && showFinalists && (
        <div className="flex gap-40 items-center">
          <button
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
    </div>
  );
};

export default Finals;
