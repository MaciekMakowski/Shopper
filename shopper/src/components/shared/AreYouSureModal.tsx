import { FC, useState } from "react";
import { AreYouSureModalProps } from "../../interfaces/components";
import Modal from "./Modal";
const AreYouSureModal: FC<AreYouSureModalProps> = ({
  onConfirm,
  title,
  message,
  trigger,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {trigger}
      </button>
      <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        <h1 className="font-semibold text-xl">{title}</h1>
        <p className="text-lg font-light">{message}</p>
        <div className="flex w-full justify-between">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 border border-dark-primary rounded-md"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-warning rounded-md"
          >
            Yes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AreYouSureModal;
