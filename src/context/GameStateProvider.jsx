import { useReducer, useEffect } from "react";
import { gameStateContext } from "./gameStateContext";
import { gameStateReducer, initialGameState } from "./gameStateContext";

const useGameStateProvider = () => {
  // When this renders we want to fetch the gamestate stored in local storage.
  const getInitialState = () => {
    const storedGameState = localStorage.getItem("storedGameState1");
    // If there is no gamestate we just return initial state
    return storedGameState ? JSON.parse(storedGameState) : initialGameState;
  };

  const initialState = getInitialState();
  // We pass the inital state to the useReducer.
  const [gameState, dispatch] = useReducer(gameStateReducer, initialState);

  useEffect(() => {
    // Store the state in localStorage on state updates
    localStorage.setItem("storedGameState", JSON.stringify(gameState));
  }, [gameState]);

  return { gameState, dispatch };
};

export const GameStateProvider = ({ children }) => {
  const value = useGameStateProvider();
  return (
    <gameStateContext.Provider value={value}>
      {children}
    </gameStateContext.Provider>
  );
};
