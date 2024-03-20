import { createContext, useContext } from "react";

export const gameStateContext = createContext();

export const useGameState = () => useContext(gameStateContext);

export const initialGameState = { players: [] };

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
