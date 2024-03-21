import { createContext, useContext } from "react";
import trivia from "../assets/trivia_one";

export const gameStateContext = createContext();

export const useGameState = () => useContext(gameStateContext);

// We have different phases in the game
// The game starts with lobby
// start => you can add new players
// lobby => when you press play you go to round selection
// rounds => when round is selected we show the questions.
// after each round you go back to the lobby to select the new round and check the score.
export const initialGameState = {
  players: [],
  trivia: trivia,
  phase: "lobby",
};

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
    case "GO_TO_ROUNDS":
      return {
        ...state,
        phase: "rounds",
      };
    case "GO_TO_LOBBY":
      return {
        ...state,
        phase: "lobby",
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
