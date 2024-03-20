// React imports
import { useState } from "react";

import { useGameState } from "./context/gameStateContext";
import Modal from "./components/Modal";

const App = () => {
  const [open, setOpen] = useState();
  const { gameState } = useGameState();

  console.log(gameState);
  return (
    <div className="text-3xl font-bold underline">
      <Modal isOpen={open} close={() => setOpen(false)}>
        <button>test</button>
      </Modal>
      <button onClick={() => setOpen(true)}>open</button>
    </div>
  );
};

export default App;
