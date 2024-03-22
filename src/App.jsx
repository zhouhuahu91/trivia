// React imports
// import { useState } from "react";
import { useGameState } from "./context/gameStateContext";
// Component imports
import AddPlayer from "./components/AddPlayer";
import Players from "./components/Players";
import Rounds from "./components/Rounds";
import Questions from "./components/Qeustions";
import Finals from "./components/Finals";

const App = () => {
  const {
    gameState: { phase },
  } = useGameState();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-32 mt-10">
      {phase === "lobby" && <AddPlayer />}
      {phase === "rounds" && <Rounds />}
      {phase !== "questions" && phase !== "finals" && <Players />}
      {phase === "questions" && <Questions />}
      {phase === "finals" && <Finals />}
    </div>
  );
};

export default App;
