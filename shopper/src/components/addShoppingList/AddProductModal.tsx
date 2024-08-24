import AddIcon from "@/assets/icons/addIcon.svg?react";
import Modal from "@/components/shared/Modal";
import { AddProductModalProps } from "@/interfaces/components";
import { FC, useState } from "react";
const AddProductModal: FC<AddProductModalProps> = ({
  isOpen,
  setIsOpen,
  newProduct,
  setNewProduct,
  newAisle,
  setNewAisle,
  addNewAisle,
  handleSaveProduct,
  newShoppingList,
}) => {
  const [selectedAisle, setSelectedAisle] = useState<string>("");
  const handleChangeAisle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAisle(e.target.value);
    setNewProduct({ ...newProduct, aisle: e.target.value });
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold font-secondary">New product</h2>
        <p>
          Please select aisle and add product to the shop before adding it to
          the list
        </p>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedAisle}
          onChange={handleChangeAisle}
        >
          <option value="">Select Aisle</option>
          {newShoppingList.shop.aisles.map((aisle, index) => (
            <option key={index} value={aisle.name}>
              {aisle.name}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add new aisle"
            value={newAisle.name}
            onChange={(e) => setNewAisle({ ...newAisle, name: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => addNewAisle()}
          >
            <AddIcon width={24} height={24} />
          </button>
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={() => {
            handleSaveProduct();
            setSelectedAisle("");
          }}
          disabled={!newProduct.aisle || newProduct.aisle.length === 0}
        >
          Save Product
        </button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
