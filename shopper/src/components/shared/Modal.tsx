import { ModalProps } from "@/interfaces/components";
import { FC } from "react";

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <div
      className={`fixed inset-0 px-4 backdrop-blur-sm bg-opacity-30 z-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
