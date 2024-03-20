import { createContext, useContext } from "react";

export const gameStateContext = createContext();

export const useGameState = () => useContext(gameStateContext);

export const initialGameState = { players: [] };

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return {
        ...state,
        players: [...state.players, { name: action.payload, points: 0 }],
      };
    default:
      return state;
  }
};
