import { useGameState } from "./context/gameStateContext";

const App = () => {
  const { gameState } = useGameState();

  console.log(gameState);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default App;
