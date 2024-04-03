import { useState, useRef } from "react";
import { useGameState } from "../context/gameStateContext";
import { AnimatePresence, motion } from "framer-motion";
// Component imports
import Modal from "./Modal";

const Players = () => {
  const [deletePlayerModal, setDeletePlayerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const {
    gameState: { players },
    dispatch,
  } = useGameState();

  const audioRef = useRef(new Audio("/points.mp3"));

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <Modal
        isOpen={deletePlayerModal}
        close={() => setDeletePlayerModal(false)}
        className="bg-white rounded-md max-w-md"
      >
        <div className="border-b p-4 shadow-lg flex items-center justify-between">
          <div className="text-lg font-bold">Speler verwijderen</div>
          <button
            onClick={() => setDeletePlayerModal(false)}
            className="material-symbols-outlined text-red-400"
          >
            close
          </button>
        </div>
        <div className="px-4 py-8 bg-neutral-50">
          Weet je het zeker dat je{" "}
          <span className="font-bold text-main">{selectedPlayer.name}</span>{" "}
          wilt verwijderen?
        </div>
        <div className="flex gap-4 py-2 px-4 items-center justify-end border-t">
          <button
            onClick={() => {
              dispatch({ type: "DELETE_PLAYER", payload: selectedPlayer.name });
              setDeletePlayerModal(false);
              setSelectedPlayer({});
            }}
            className="border py-2 px-4 rounded-md shadow-lg bg-main text-white font-medium"
          >
            Verwijderen
          </button>
          <button
            onClick={() => setDeletePlayerModal(false)}
            className="border py-2 px-4 rounded-md shadow-lg"
          >
            Annuleren
          </button>
        </div>
      </Modal>
      <div className="flex gap-4">
        <AnimatePresence>
          {players.map((player) => {
            return (
              <motion.div
                initial={{ scale: 0, rotate: "12.5deg" }}
                animate={{ scale: 1, rotate: "0deg" }}
                exit={{ scale: 0, rotate: "0deg" }}
                key={player.name}
                className="p-4 select-none border rounded-md shadow-lg font-medim flex flex-col items-center justify-center gap-4 min-w-48"
              >
                <button
                  onClick={() => {
                    setDeletePlayerModal(true);
                    setSelectedPlayer(player);
                  }}
                  className="text-xl capitalize"
                >
                  {player.name}
                </button>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_POINT",
                        payload: player.name,
                      })
                    }
                    className="material-symbols-outlined text-main"
                  >
                    do_not_disturb_on
                  </button>
                  <span className="font-bold text-3xl min-w-10 text-center">
                    {player.score}
                  </span>
                  <button
                    onClick={() => {
                      dispatch({ type: "ADD_POINT", payload: player.name });
                      startAudio();
                    }}
                    className="material-symbols-outlined text-main"
                  >
                    add_circle
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Players;
