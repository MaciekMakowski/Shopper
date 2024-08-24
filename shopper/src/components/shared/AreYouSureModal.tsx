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
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-xl">{title}</h1>
          <p className="text-lg font-light">{message}</p>
          <div className="flex w-full justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-primary text-white rounded-md"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 border-2 border-warning rounded-md text-warning"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AreYouSureModal;
