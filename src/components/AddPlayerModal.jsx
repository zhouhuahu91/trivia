import Modal from "./Modal";

const AddPlayerModal = ({ isOpen, close }) => {
  return (
    <Modal
      isOpen={isOpen}
      close={close}
      className="bg-white shadow-lg w-full max-w-md"
    >
      <div className="flex justify-between items-center p-2">
        <div className="">Speler Toevoegen</div>
        <button onClick={() => close()} className="material-symbols-outlined">
          close
        </button>
      </div>
      <div>
        <input />
      </div>
    </Modal>
  );
};
export default AddPlayerModal;
