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
        className="bg-white fixed sm:static sm:max-w-lg inset-0 md:block w-full h-full flex flex-col overflow-scroll"
        isOpen={isOpen}
        close={() => closeModal()}
      >
        <div>
          <div className="border-b p-4 flex items-center justify-between w-full">
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
          <div className="bg-neutral-50 py-8">
            {trivia.rounds.map((round) => {
              return <EditRound key={round.id} round={round} trivia={trivia} />;
            })}
            <button
              onClick={() => addNewRound()}
              className="rounded mx-4 py-1 px-4 border text-xs bg-white flex items-center justify-center capitalize"
            >
              <span className="material-symbols-outlined text-base">add</span>
              ronde
            </button>
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
        </div>
      </Modal>
    </>
  );
};

export default EditTriviaModal;
