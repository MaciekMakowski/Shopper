import AddIcon from "@/assets/icons/addIcon.svg?react";
import { NewAisle } from "@/interfaces/addShop";
import { motion } from "framer-motion";
import { FC } from "react";

const AddAisle: FC<NewAisle> = ({
  isAddingAisle,
  newAisle,
  setNewAisle,
  handleAddAisleToShop,
}) => {
  return (
    <motion.div
      className="flex gap-2"
      initial={{ opacity: 0, x: 100, display: "none" }}
      animate={{
        opacity: isAddingAisle ? 1 : 0,
        x: isAddingAisle ? 0 : 100,
        display: isAddingAisle ? "flex" : "none",
      }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <input
        id="aisleName"
        type="text"
        placeholder="Aisle Name"
        value={newAisle.name}
        onChange={(e) => setNewAisle({ ...newAisle, name: e.target.value })}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <button
        className="p-2 rounded-md border-primary border-2"
        onClick={handleAddAisleToShop}
      >
        <AddIcon className="text-primary" width={20} height={20} />
      </button>
    </motion.div>
  );
};

export default AddAisle;
