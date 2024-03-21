import { createContext, useContext } from "react";

export const gameStateContext = createContext();

export const useGameState = () => useContext(gameStateContext);

export const initialGameState = { players: [] };

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return {
        ...state,
        players: [...state.players, { name: action.payload, score: 0 }],
      };
    case "DELETE_PLAYER":
      return {
        ...state,
        players: state.players.filter(
          (player) => player.name !== action.payload
        ),
      };
    case "ADD_POINT":
      return {
        ...state,
        players: addPoint(state, action),
      };
    case "REMOVE_POINT":
      return {
        ...state,
        players: removePoint(state, action),
      };
    default:
      return state;
  }
};

const addPoint = (state, action) => {
  return state.players.map((player) => {
    return player.name === action.payload
      ? {
          ...player,
          score: player.score + 1,
        }
      : player;
  });
};

const removePoint = (state, action) => {
  return state.players.map((player) => {
    return player.name === action.payload
      ? {
          ...player,
          score: player.score === 0 ? 0 : player.score - 1,
        }
      : player;
  });
};
