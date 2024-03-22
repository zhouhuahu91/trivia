import { createContext, useContext } from "react";
import trivia from "../assets/trivia_one";

export const gameStateContext = createContext();

export const useGameState = () => useContext(gameStateContext);

// We have different phases in the game
// The game starts with lobby
// start => you can add new players
// lobby => when you press play you go to round selection
// rounds => when round is selected we show the the rounds of the game.
// questions => here we cicle through the selected round and give the questions.
// after each round you go back to the lobby to select the new round and check the score.
export const initialGameState = {
  players: [],
  trivia: trivia,
  phase: "lobby",
  questions: [],
  finalists: [],
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

    case "REMOVE_POINT_FINALIST":
      return {
        ...state,
        finalists: removePointFinalist(state, action),
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
    case "GO_TO_FINALS":
      return {
        ...state,
        phase: "finals",
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        phase: "questions",
        questions: action.payload,
      };
    case "GET_FINALISTS":
      return {
        ...state,
        finalists: getFinalists(state),
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

const getFinalists = (state) => {
  const x = [...state.players];
  x.sort((a, b) => b.score - a.score);
  return x
    .slice(0, 2)
    .map((player) => ({ ...player, score: player.score * 10 }));
};

const countDown = (state, action) => {
  return state.finalists.map((player) =>
    player.name === action.payload
      ? { ...player, score: player.score - 1 }
      : player
  );
};

const removePointFinalist = (state, action) => {
  return state.finalists.map((player) => {
    return player.name === action.payload
      ? {
          ...player,
          score: player.score === 0 ? 0 : player.score - 1,
        }
      : player;
  });
};
