import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
const Modal = ({ isOpen, children, close, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close()}
            className="bg-slate-900/20 backdrop-blur fixed inset-0 w-full h-full flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className={className}
            >
              {children}
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
};

export default Modal;
