import { useState } from "react";
import { useGameState } from "../context/gameStateContext";

const Finals = () => {
  const [showFinalists, setShowFinalists] = useState(false);
  const {
    gameState: { finalists },
    dispatch,
  } = useGameState();

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
          <div className="capitalize border p-8 rounded-md shadow-lg w-60 flex flex-col items-center justify-center gap-6">
            <div className="text-lg font-medium">{finalists[0].name}</div>
            <div className="text-5xl font-medium font-mono">
              {finalists[0].score}
            </div>
          </div>
          <span className="italic text-3xl">VS</span>
          <div className="capitalize border p-8 rounded-md shadow-lg w-60 flex flex-col items-center justify-center gap-6">
            <div className="text-lg font-medium">{finalists[1].name}</div>
            <div className="text-5xl font-medium font-mono">
              {finalists[1].score}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finals;
