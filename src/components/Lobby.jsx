import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import {
  onSnapshot,
  query,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { useGameState } from "../context/gameStateContext";

import AddTriviaModal from "./AddTriviaModal";
import EditTriviaModal from "./EditTriviaModal";
import Modal from "./Modal";

const DeleteModal = ({ trivia }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="material-symbols-outlined text-gray-100 hover:text-red-400 mx-2"
      >
        delete
      </button>
      <Modal
        className="bg-white rounded-md max-w-md w-full"
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      >
        <div className="border-b p-4 shadow-lg flex items-center justify-between">
          <div className="text-lg font-bold">{trivia.name}</div>
          <button
            onClick={() => setIsOpen(false)}
            className="material-symbols-outlined text-red-400"
          >
            close
          </button>
        </div>
        <div className="px-4 py-8 bg-neutral-50">
          Weet je zeker dat je{" "}
          <span className="font-bold text-main">{trivia.name}</span> wilt
          verwijderen?
        </div>
        <div className="flex gap-4 py-2 px-4 items-center justify-end border-t">
          <button
            onClick={() => {
              const ref = doc(db, "trivias", trivia.id);
              deleteDoc(ref);
            }}
            className="border py-2 px-4 rounded-md shadow-lg bg-main text-white font-medium"
          >
            Verwijderen
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="border py-2 px-4 rounded-md shadow-lg"
          >
            Annuleren
          </button>
        </div>
      </Modal>
    </>
  );
};

const Lobby = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trivias, setTrivias] = useState([]);

  const { dispatch } = useGameState();

  // Fetches all the trivias on firestore.
  useEffect(() => {
    const q = query(collection(db, "trivias"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTrivias(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <AddTriviaModal trivias={trivias} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col items-center w-full px-4">
        <div className="text-7xl font-bold tracking-widest text-main my-10">
          Trivia!
        </div>
        <div className="flex flex-col border rounded overflow-hidden w-full max-w-md shadow-inner">
          <div className="py-2 px-4 border-b font-medium flex justify-between">
            <div>Trivia{"'"}s</div>
            <button
              onClick={() => setIsOpen(true)}
              className="material-symbols-outlined w-16 flex items-center justify-center"
            >
              add
            </button>
          </div>
          {trivias.map((trivia, idx) => {
            return (
              <div
                className={`${
                  idx % 2 > 0 && "bg-neutral-50"
                } py-2 px-4 last:border-none border-b flex justify-between`}
                key={trivia.id}
              >
                <div className="flex items-center gap-2">
                  {trivia.name} <EditTriviaModal trivia={trivia} />{" "}
                  <DeleteModal trivia={trivia} />
                </div>
                <button
                  onClick={() => {
                    dispatch({ type: "SET_TRIVIA", payload: trivia });
                  }}
                  className="bg-main px-4 rounded text-white material-symbols-outlined w-16"
                >
                  play_arrow
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Lobby;
