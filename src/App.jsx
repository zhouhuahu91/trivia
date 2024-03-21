// React imports
// import { useState } from "react";
import { useGameState } from "./context/gameStateContext";
// Component imports
import AddPlayer from "./components/AddPlayer";
import Players from "./components/Players";

const App = () => {
  const { gameState } = useGameState();

  console.log(gameState);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-32">
      <AddPlayer />
      <Players />
    </div>
  );
};

export default App;
