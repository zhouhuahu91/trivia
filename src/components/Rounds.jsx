import { useGameState } from "../context/gameStateContext";

const Rounds = () => {
  const { gameState, dispatch } = useGameState();

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full mt-10">
      <button
        onClick={() =>
          dispatch({
            type: "GO_TO_LOBBY",
          })
        }
        className="flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="text-xl font-medium">Terug</span>
      </button>
      <h1 className="max-w-5xl text-xl">
        Welkom op onze Trivia Avond, waar we jouw kennis testen in algemene
        kennis, sport, geschiedenis, muziek, film, en geografie.{" "}
        <span className="text-main font-bold">Zestig vragen</span>, één
        uitdaging - laat zien wat je weet!
      </h1>
      <div className="flex gap-4">
        {gameState.trivia.rounds.map((round) => {
          return (
            <button
              className="border py-4 px-6 min-w-32 rounded-md shadow-lg flex flex-col items-center justify-center gap-2"
              key={round.theme}
            >
              <div className="material-symbols-outlined">{round.icon}</div>
              <div className="capitalize">{round.theme}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Rounds;
