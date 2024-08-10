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
            className="p-2 border border-gray-300 rounded-md w-[70%]"
          />
          <button
            className="py-2 bg-secondary rounded-md border-primary border-2 flex-1"
            onClick={handleAddAisleToShop}
          >
            <span>Add Aisle</span>
          </button>
        </div>
      )}
    </>
  );
};

export default AddAisle;
