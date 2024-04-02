import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import { onSnapshot, query, collection } from "firebase/firestore";

import AddTriviaModal from "./AddTriviaModal";
import EditTriviaModal from "./EditTriviaModal";

const Lobby = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trivias, setTrivias] = useState([]);

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
                  {trivia.name} <EditTriviaModal trivia={trivia} />
                </div>
                <button
                  onClick={() => {
                    // to-do: start a new game on firestore.
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
