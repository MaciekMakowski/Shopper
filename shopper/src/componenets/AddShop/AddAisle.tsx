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
        <div className="flex flex-col gap-2">
          <label htmlFor="aisleName">Aisle Name</label>
          <input
            id="aisleName"
            type="text"
            value={newAisle.name}
            onChange={(e) => setNewAisle({ ...newAisle, name: e.target.value })}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            className="py-2 bg-secondary rounded-md border-primary border-2"
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
