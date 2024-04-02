import { useState } from "react";

import { db } from "../firebase/config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import ShortUniqueId from "short-unique-id";

import Modal from "./Modal";

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
        answers: ["test", "test"],
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
          <div className="border-b p-4 shadow-lg flex items-center justify-between fixed top-0 w-full bg-white">
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
          <div className="bg-neutral-50 mt-20">
            {trivia.rounds.map((round) => {
              return <EditRound key={round.id} round={round} trivia={trivia} />;
            })}
            <div className="p-4">
              <h1 className="text-main text-xl font-bold mb-2">Finale</h1>
              {trivia.finale.questions.map((q, idx) => {
                return (
                  <EditFinale idx={idx} trivia={trivia} q={q} key={q.id} />
                );
              })}
              <button
                onClick={() => addFinaleQ()}
                className="rounded py-1 mt-2 px-4 border text-xs bg-white flex items-center justify-center capitalize"
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

const EditFinale = ({ trivia, q, idx }) => {
  const [question, setQuestion] = useState(q.question);

  const deleteQ = () => {
    const array = trivia.finale.questions.filter((x) => x.id !== q.id);
    const ref = doc(db, "trivias", trivia.id);
    updateDoc(ref, {
      "finale.questions": array,
    });
  };

  const saveQeustion = () => {
    const array = trivia.finale.questions.map((x) => {
      return x.id === q.id
        ? {
            ...q,
            question,
          }
        : x;
    });
    const ref = doc(db, "trivias", trivia.id);
    updateDoc(ref, {
      "finale.questions": array,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 underline italic">
          Vraag: {idx + 1}
        </span>
        <button
          onClick={() => deleteQ()}
          className="material-symbols-outlined text-base text-gray-200 hover:text-red-400"
        >
          delete
        </button>
      </div>
      <textarea
        placeholder="vraag?"
        className="naked-input w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onBlur={() => saveQeustion()}
        rows="1"
      />
      <div className="flex gap-2">
        {q.answers.map((answer, idx) => {
          return (
            <span className="text-sm" key={idx}>
              {answer}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const EditRound = ({ round, trivia }) => {
  const [name, setName] = useState(round.theme);

  const addNewQuestion = (round) => {
    const array = trivia.rounds.map((x) => {
      return x.id === round.id
        ? {
            ...round,
            questions: [
              ...round.questions,
              {
                id: randomUUID(),
                question: "",
                answer: "",
              },
            ],
          }
        : x;
    });
    const ref = doc(db, `trivias/${trivia.id}`);

    updateDoc(ref, {
      rounds: array,
    });
  };

  const deleteRound = () => {
    // create a new array without this round in it.
    const array = trivia.rounds.filter((x) => x.id !== round.id);

    const ref = doc(db, `trivias/${trivia.id}`);

    updateDoc(ref, {
      rounds: array,
    });
  };

  return (
    <div className="flex flex-col p-4">
      <input
        placeholder="Categorie"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onBlur={() => {
          // onBlur we loop over the rounds are change the name of the current round.
          const array = trivia.rounds.map((x) => {
            return x.id === round.id
              ? {
                  ...round,
                  theme: name,
                }
              : x;
          });
          const ref = doc(db, "trivias", trivia.id);
          updateDoc(ref, {
            rounds: array,
          });
        }}
        className="naked-input text-main text-xl font-bold mb-2"
      />
      <div>
        {round.questions.map((q, idx) => {
          return (
            <EditQuestion
              key={q.id}
              idx={idx}
              q={q}
              trivia={trivia}
              round={round}
            />
          );
        })}
      </div>
      <div className="flex gap-2 justify-between">
        <button
          onClick={() => addNewQuestion(round)}
          className="rounded py-1 px-4 border text-xs bg-white flex items-center justify-center capitalize"
        >
          <span className="material-symbols-outlined text-base">add</span> vraag
        </button>
        <button
          onClick={() => deleteRound()}
          className="material-symbols-outlined text-gray-200 hover:text-red-400"
        >
          delete
        </button>
      </div>
    </div>
  );
};

const EditQuestion = ({ q, idx, round, trivia }) => {
  const [question, setQuestion] = useState(q.question);
  const [answer, setAnswer] = useState(q.answer);

  const saveQuestion = () => {
    // We need to create a new array with the correct question ajusted.
    const array = trivia.rounds.map((x) => {
      return x.id === round.id
        ? {
            ...round,
            questions: round.questions.map((y) => {
              return y.id === q.id ? { ...q, question: question } : y;
            }),
          }
        : x;
    });

    const ref = doc(db, "trivias", trivia.id);

    updateDoc(ref, {
      rounds: array,
    });
  };

  const saveAnswer = () => {
    // We need to create a new array with the correct answer ajusted.
    const array = trivia.rounds.map((x) => {
      return x.id === round.id
        ? {
            ...round,
            questions: round.questions.map((y) => {
              return y.id === q.id ? { ...q, answer: answer } : y;
            }),
          }
        : x;
    });

    const ref = doc(db, "trivias", trivia.id);

    updateDoc(ref, {
      rounds: array,
    });
  };

  const deleteQ = () => {
    // We need to create a new array without the current q in it
    const array = trivia.rounds.map((x) => {
      return x.id === round.id
        ? {
            ...round,
            questions: round.questions.filter((y) => y.id !== q.id),
          }
        : x;
    });

    const ref = doc(db, "trivias", trivia.id);

    updateDoc(ref, {
      rounds: array,
    });
  };

  return (
    <div key={q.id} className="my-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 underline italic">
          Vraag: {idx + 1}
        </span>
        <button
          onClick={() => deleteQ()}
          className="material-symbols-outlined text-base text-gray-200 hover:text-red-400"
        >
          delete
        </button>
      </div>
      <textarea
        placeholder="vraag?"
        className="naked-input w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onBlur={() => saveQuestion()}
        rows="1"
      />
      <textarea
        placeholder="antwoord"
        className="naked-input w-full"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onBlur={() => saveAnswer()}
        rows="1"
      />
    </div>
  );
};

export default EditTriviaModal;
