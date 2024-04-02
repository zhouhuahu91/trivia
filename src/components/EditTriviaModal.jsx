import { useState } from "react";

import Modal from "./Modal";

const EditTriviaModal = ({ trivia }) => {
  const [isOpen, setIsOpen] = useState();

  const closeModal = () => {
    setIsOpen(false);
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
        className="bg-white rounded-md max-w-md w-full"
        isOpen={isOpen}
        close={() => closeModal()}
      >
        <div className="border-b p-4 shadow-lg flex items-center justify-between">
          <div className="text-lg font-bold">{trivia.name}</div>
          <button
            onClick={() => closeModal()}
            className="material-symbols-outlined text-red-400"
          >
            close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditTriviaModal;
