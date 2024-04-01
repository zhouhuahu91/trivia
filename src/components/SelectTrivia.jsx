import { useState, useEffect } from "react";

import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";

import Modal from "./Modal";

const SelectTrivia = () => {
  const [isOpen, setIsOpen] = useState();
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState("");
  const [trivias, setTrivias] = useState([]);

  const submit = async () => {
    setErrors("");
    if (input.length < 4) {
      return setErrors("Naam is te kort.");
    }
    if (input.length > 20) {
      return setErrors("Naam mag niet langer dan 20 characters zijn.");
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

  useEffect(() => {
    const q = query(collection(db, "trivias"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTrivias(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Modal
        className="bg-white rounded-md max-w-md w-full"
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      >
        <div className="border-b p-4 shadow-lg flex items-center justify-between">
          <div className="text-lg font-bold">Nieuwe Trivia!</div>
          <button
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
            className="border py-2 px-4 rounded-md shadow-lg"
          >
            Annuleren
          </button>
        </div>
      </Modal>
      <div className="flex flex-col gap-4 items-center">
        <div className="text-7xl font-bold tracking-widest text-main my-10">
          Trivia!
        </div>
        <div>
          <h1 className="font-medium text-xl">Selecteer een trivia</h1>
        </div>
        <div className="flex gap-2">
          {trivias.map((trivia) => {
            return (
              <button
                className="p-4 border rounded-md shadow-lg"
                key={trivia.id}
              >
                {trivia.name}
              </button>
            );
          })}
          <button
            onClick={() => setIsOpen(true)}
            className="border p-2 rounded-md shadow-lg flex items-center justify-center"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectTrivia;
