import { useState } from "react";

import { db } from "../../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

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
        className="naked-input w-full font-medium"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onBlur={() => saveQuestion()}
      />
      <textarea
        placeholder="antwoord"
        className="naked-input w-full italic"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onBlur={() => saveAnswer()}
      />
    </div>
  );
};

export default EditQuestion;
