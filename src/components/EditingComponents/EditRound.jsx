import { useState } from "react";

import { db } from "../../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import ShortUniqueId from "short-unique-id";

import EditQuestion from "./EditQuestion";

const { randomUUID } = new ShortUniqueId({ length: 10 });

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
        className="naked-input text-main text-xl font-bold mb-2 capitalize"
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

export default EditRound;
