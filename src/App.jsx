// React imports
// import { useState } from "react";
import { useGameState } from "./context/gameStateContext";
// Component imports
import AddPlayer from "./components/AddPlayer";
import Players from "./components/Players";

const App = () => {
  const {
    gameState: { status },
  } = useGameState();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-32 mt-10">
      {status === "lobby" && <AddPlayer />}
      <div className="fixed bottom-10">
        <Players />
      </div>
    </div>
  );
};

export default App;
