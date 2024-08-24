import AddIcon from "@/assets/icons/addIcon.svg?react";
import CloseIcon from "@/assets/icons/closeIcon.svg?react";
import { AisleColumnProps } from "@/interfaces/addShop";
import { Aisle } from "@/interfaces/shop";
import { motion } from "framer-motion";
import { FC } from "react";
import AddAisle from "./AddAisle";
import AddedItem from "./AddedItem";
const AisleColumn: FC<AisleColumnProps> = ({
  isAddingAisle,
  setIsAddingAisle,
  newAisle,
  setNewAisle,
  handleAddAisleToShop,
  newShop,
  setNewShop,
  handleDeleteAisle,
  handleOpenAddProduct,
  hangeAislePosition,
}) => {
  return (
    <motion.div
      className="flex flex-col gap-4 bg-white shadow-md h-full p-4 rounded-md overflow-x-hidden"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header>
        <div className="flex w-full justify-between">
          <h2 className="text-2xl font-bold font-secondary">Aisles</h2>
          <button
            className={`${
              isAddingAisle ? "bg-warning" : "bg-primary"
            } p-2 flex rounded h-fit`}
            onClick={() => setIsAddingAisle(!isAddingAisle)}
          >
            {isAddingAisle ? (
              <CloseIcon className="text-white" width={20} height={20} />
            ) : (
              <AddIcon className="text-white" width={20} height={20} />
            )}
          </button>
        </div>
        <p> Here you can see aisles added to your shop </p>
      </header>
      <AddAisle
        isAddingAisle={isAddingAisle}
        newAisle={newAisle}
        setNewAisle={setNewAisle}
        handleAddAisleToShop={() => handleAddAisleToShop()}
      />
      {newShop.aisles &&
        newShop.aisles.map((aisle: Aisle) => (
          <AddedItem
            key={aisle.id}
            item={aisle}
            handleDeleteItem={() => handleDeleteAisle(aisle.id)}
            handleOpenAddSubItem={() => handleOpenAddProduct(aisle)}
            newShop={newShop}
            setNewShop={setNewShop}
            hangeAislePosition={hangeAislePosition}
          />
        ))}
    </motion.div>
  );
};

export default AisleColumn;
