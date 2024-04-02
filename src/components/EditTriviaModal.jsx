import { useState } from "react";

import { db } from "../firebase/config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

import Modal from "./Modal";

const EditTriviaModal = ({ trivia }) => {
  const [isOpen, setIsOpen] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };

  const addNewRound = () => {
    const id = trivia.rounds.length;
    const round = {
      id: id,
      theme: "test",
      questions: [],
    };

    const ref = doc(db, `trivias/${trivia.id}`);
    updateDoc(ref, {
      rounds: arrayUnion(round),
    });
  };

  const addNewQuestion = (round) => {
    const array = trivia.rounds.map((x) => {
      return x.id === round.id
        ? {
            ...round,
            questions: [
              ...round.questions,
              { id: round.questions.length, question: "test", answer: "test" },
            ],
          }
        : x;
    });
    console.log(array);
    const ref = doc(db, `trivias/${trivia.id}`);

    updateDoc(ref, {
      rounds: array,
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
        className="bg-white rounded-md max-w-md w-full overflow-hidden"
        isOpen={isOpen}
        close={() => closeModal()}
      >
        <div
          style={{ maxHeight: "calc(100vh - 265px)" }}
          className="overflow-auto"
        >
          <div className="border-b p-4 shadow-lg flex items-center justify-between fixed top-0 w-full bg-white">
            <div className="text-lg font-bold">{trivia.name}</div>
            <button
              onClick={() => closeModal()}
              className="material-symbols-outlined text-red-400"
            >
              close
            </button>
          </div>
          <div className="p-4">
            <button onClick={() => addNewRound()}>
              nieuwe ronde toevoegen
            </button>
          </div>
          <div className="">
            {trivia.rounds.map((round) => {
              return (
                <div className="flex flex-col p-4" key={round.id}>
                  <span className="text-main font-medium text-lg py-2">
                    {round.theme} // name of the round
                  </span>
                  <div>
                    {round.questions.map((q) => {
                      return (
                        <div key={q.id}>
                          <div>vraag: {q.id + 1}</div>
                          <div>{q.question}</div>
                          <div>{q.answer}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <button
                      onClick={() => addNewQuestion(round)}
                      className="rounded p-2 border"
                    >
                      + vraag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditTriviaModal;
