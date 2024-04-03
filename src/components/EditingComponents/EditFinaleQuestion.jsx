import { useState } from "react";

import { db } from "../../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const EditFinaleQuestion = ({ trivia, q, idx }) => {
  const [question, setQuestion] = useState(q.question);
  const [answers, setAnswers] = useState(q.answers.join(", "));

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

  const saveAnswers = () => {
    const array = trivia.finale.questions.map((x) => {
      return x.id === q.id
        ? {
            ...q,
            answers: answers.split(", "),
          }
        : x;
    });

    const ref = doc(db, "trivias", trivia.id);
    updateDoc(ref, {
      "finale.questions": array,
    });
  };

  return (
    <div className="my-4">
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
        onBlur={() => saveQeustion()}
      />
      <div className="flex gap-2 flex-col">
        <input
          placeholder="Scheid de antwoorden met een komma."
          value={answers}
          className="naked-input italic"
          onChange={(e) => setAnswers(e.target.value)}
          onBlur={() => saveAnswers()}
        />
      </div>
    </div>
  );
};

export default EditFinaleQuestion;
