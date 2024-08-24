import CloseIcon from "@/assets/icons/closeIcon.svg?react"; // Upewnij się, że zaimportowałeś ten komponent
import { ModalProps } from "@/interfaces/components";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 px-4 backdrop-blur-sm bg-opacity-30 z-50 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }} // Stan początkowy animacji
          animate={{ opacity: 1, scale: 1 }} // Stan końcowy animacji
          exit={{ opacity: 0, scale: 0.9 }} // Stan animacji podczas znikania
          transition={{ duration: 0.3 }} // Czas trwania animacji
        >
          <motion.div
            className="bg-white p-4 rounded-lg border-2 border-zinc-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
