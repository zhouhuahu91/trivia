import { useState } from "react";
import Modal from "./Modal";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const AddTriviaModal = ({ isOpen, setIsOpen, trivias }) => {
  const [errors, setErrors] = useState("");
  const [input, setInput] = useState("");

  const submit = async () => {
    // We sanitize the input by making it lowercase and removing the white spaces.
    const sanitizedInput = input.replace(/\s+/g, "").toLowerCase();
    if (sanitizedInput.length < 4) {
      return setErrors("Naam is te kort.");
    }
    if (sanitizedInput.length > 20) {
      return setErrors("Naam mag niet langer dan 20 characters zijn.");
    }
    // These are the names that are already in the trivia.
    const namesInUse = trivias.map((trivia) =>
      trivia.name.replace(/\s+/g, "").toLowerCase()
    );
    if (namesInUse.includes(sanitizedInput)) {
      return setErrors("Naam is in gebruik");
    }

    const trivia = {
      name: input,
      rounds: [{}],
      finale: {},
    };
    await addDoc(collection(db, "trivias"), trivia);

    setIsOpen(false);
    setInput("");
  };

  const closeModal = () => {
    setIsOpen(false);
    setInput("");
    setErrors("");
  };

  return (
    <Modal
      className="bg-white rounded-md max-w-md w-full"
      isOpen={isOpen}
      close={() => closeModal()}
    >
      <div className="border-b p-4 shadow-lg flex items-center justify-between">
        <div className="text-lg font-bold">Nieuwe Trivia!</div>
        <button
          onClick={() => closeModal()}
          className="material-symbols-outlined text-red-400"
        >
          close
        </button>
      </div>
      <div className="px-4 py-8 bg-neutral-50 flex flex-col relative">
        <h2>Wat is de naam van de trivia?</h2>
        <input
          value={input}
          onChange={(e) => {
            if (errors) {
              setErrors("");
            }
            setInput(e.target.value);
          }}
          className="input"
        />
        {errors && (
          <label className="absolute bottom-4 text-xs text-red-400">
            {errors}
          </label>
        )}
      </div>
      <div className="flex gap-4 py-2 px-4 items-center justify-end border-t">
        <button
          onClick={() => submit()}
          className="border py-2 px-4 rounded-md shadow-lg bg-main text-white font-medium"
        >
          Opslaan
        </button>
        <button
          onClick={() => closeModal()}
          className="border py-2 px-4 rounded-md shadow-lg"
        >
          Annuleren
        </button>
      </div>
    </Modal>
  );
};

export default AddTriviaModal;
