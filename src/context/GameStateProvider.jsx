import { useReducer } from "react";
import { gameStateContext } from "./gameStateContext";
import { gameStateReducer, initialGameState } from "./gameStateContext";

const useGameStateProvider = () => {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);

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
