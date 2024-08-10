import AddIcon from "@/assets/icons/addIcon.svg?react";
import { NewAisle } from "@/interfaces/addShop";
import { FC } from "react";
const AddAisle: FC<NewAisle> = ({
  isAddingAisle,
  newAisle,
  setNewAisle,
  handleAddAisleToShop,
}) => {
  return (
    <>
      {isAddingAisle && (
        <div className="flex gap-2">
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
        </div>
      )}
    </>
  );
};

export default AddAisle;
