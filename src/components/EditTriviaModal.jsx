import { useState } from "react";

import { db } from "../firebase/config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import ShortUniqueId from "short-unique-id";

import Modal from "./Modal";
import EditFinaleQuestion from "./EditingComponents/EditFinaleQuestion";
import EditRound from "./EditingComponents/EditRound";

const { randomUUID } = new ShortUniqueId({ length: 10 });

const EditTriviaModal = ({ trivia }) => {
  const [isOpen, setIsOpen] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };

  const addNewRound = () => {
    const round = {
      id: randomUUID(),
      theme: "",
      questions: [
        {
          id: randomUUID(),
          question: "",
          answer: "",
        },
      ],
    };

    const ref = doc(db, `trivias/${trivia.id}`);
    updateDoc(ref, {
      rounds: arrayUnion(round),
    });
  };

  const addFinaleQ = () => {
    const ref = doc(db, `trivias/${trivia.id}`);
    updateDoc(ref, {
      "finale.questions": arrayUnion({
        id: randomUUID(),
        question: "",
        answers: [],
      }),
    });
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="material-symbols-outlined text-base"
      >
        edit
      </button>
      <Modal
        className="bg-white rounded-md max-w-xl w-full overflow-hidden"
        isOpen={isOpen}
        close={() => closeModal()}
      >
        <div
          style={{ maxHeight: "calc(100vh - 265px)" }}
          className="overflow-auto"
        >
          <div className="border-b p-4 flex items-center justify-between fixed top-0 w-full bg-white">
            <div className="text-3xl font-bold text-main italic">
              {trivia.name}
            </div>
            <button
              onClick={() => closeModal()}
              className="material-symbols-outlined text-red-400"
            >
              close
            </button>
          </div>
          <div className="bg-neutral-50 mt-16">
            {trivia.rounds.map((round) => {
              return <EditRound key={round.id} round={round} trivia={trivia} />;
            })}
            <div className="p-4">
              <h1 className="text-main text-xl font-bold mb-2">Finale</h1>
              {trivia.finale.questions.map((q, idx) => {
                return (
                  <EditFinaleQuestion
                    idx={idx}
                    trivia={trivia}
                    q={q}
                    key={q.id}
                  />
                );
              })}
              <button
                onClick={() => addFinaleQ()}
                className="rounded py-1 px-4 border text-xs bg-white flex items-center justify-center capitalize"
              >
                <span className="material-symbols-outlined text-base">add</span>
                vraag
              </button>
            </div>
          </div>
          <div className="p-3 border-t flex justify-end">
            <button
              className="rounded p-2 border flex items-center justify-center w-full bg-main text-white capitalize text-sm"
              onClick={() => addNewRound()}
            >
              ronde toevoegen
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditTriviaModal;
