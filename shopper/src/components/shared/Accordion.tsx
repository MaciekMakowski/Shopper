import { AccordionProps } from "@/interfaces/components";
import { motion } from "framer-motion";
import { FC, useState } from "react";
const Accordion: FC<AccordionProps> = ({ children, head, buttons }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {head}
        </div>{" "}
        {buttons}
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {isOpen && children}
      </motion.div>
    </div>
  );
};

export default Accordion;
