import { useState } from "react";

import { useGameState } from "../context/gameStateContext";

const AddPlayer = () => {
  const {
    dispatch,
    gameState: { players },
  } = useGameState();
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState("");

  const addPlayer = () => {
    if (input.length > 10) {
      return setErrors("Naam mag niet meer dan 10 characters bevatten.");
    }
    // check if the name is already in use.
    const duplicateName = players.find(
      (player) =>
        player.name.toLowerCase().trim() === input.toLowerCase().trim()
    );
    if (duplicateName) {
      return setErrors("Naam is al in gebruik");
    }

    dispatch({
      type: "ADD_PLAYER",
      payload: input,
    });
    setErrors("");
    setInput("");
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-7xl font-bold tracking-widest text-main my-10">
        Trivia!
      </div>
      <div>
        <h1 className="font-medium text-xl">Speler Toevoegen</h1>
      </div>
      <div className="w-[36rem] relative flex mb-4">
        <input
          value={input}
          onChange={(e) => {
            if (errors) {
              setErrors("");
            }
            setInput(e.target.value);
          }}
          className="input"
        />
        {errors && (
          <label className="absolute -bottom-4 text-xs text-red-400">
            {errors}
          </label>
        )}
      </div>
      <div className="flex gap-2">
        <button
          disabled={!input.length}
          className={`border font-medium rounded-md py-1.5 px-4 flex items-center justify-center transition-shadow w-40 ${
            input.length && "shadow-lg"
          }`}
          onClick={() => {
            addPlayer();
          }}
        >
          Toevoegen
        </button>
        <button
          className="border shadow-xl font-medium bg-main rounded-md py-1.5 px-4 text-white flex items-center justify-center w-40"
          onClick={() => {
            if (players.length < 2) {
              return setErrors("Je hebt minimaal 2 spelers nodig.");
            }
            dispatch({ type: "GO_TO_ROUNDS" });
          }}
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
