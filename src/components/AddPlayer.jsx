import { useState } from "react";

import { useGameState } from "../context/gameStateContext";

const AddPlayer = () => {
  const { dispatch, gameState } = useGameState();
  console.log(gameState);
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col mt-10 gap-4 items-center">
      <div>
        <h1 className="font-medium text-xl">Speler Toevoegen</h1>
      </div>
      <div className="w-96">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex gap-2">
        <button
          className="border shadow-xl font-medium rounded-md py-1.5 px-4 flex items-center justify-center w-40"
          onClick={() => {
            dispatch({
              type: "ADD_PLAYER",
              payload: input,
            });
            setInput("");
          }}
        >
          Toevoegen
        </button>
        <button
          className="border shadow-xl font-medium bg-main rounded-md py-1.5 px-4 text-white flex items-center justify-center w-40"
          onClick={() => console.log(input)}
        >
          Start
          <span className="material-symbols-outlined ml-2 font-bold text-white">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddPlayer;
