// React imports
// import { useState } from "react";
import { useGameState } from "./context/gameStateContext";
// Component imports
import AddPlayer from "./components/AddPlayer";

const App = () => {
  const { gameState } = useGameState();

  console.log(gameState);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <AddPlayer />
    </div>
  );
};

export default App;
