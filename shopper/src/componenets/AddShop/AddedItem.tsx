import AddIcon from "@/assets/icons/addIcon.svg?react";
import EditIcon from "@/assets/icons/editIcon.svg?react";
import Trashcan from "@/assets/icons/trashcan.svg?react";
import { AddedItemsProps } from "@/interfaces/addShop";
import { Shop } from "@/interfaces/shop";
import { FC, useState } from "react";
const AddedItem: FC<AddedItemsProps> = ({
  item,
  handleDeleteItem,
  handleOpenAddSubItem,
  newShop,
  setNewShop,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if ("products" in item) {
      const updatedShop: Shop = {
        ...newShop,
        aisles: newShop.aisles.map((aisle) =>
          aisle.id === item.id ? { ...aisle, name: newName } : aisle
        ),
      };

      setNewShop(updatedShop);
    } else if ("name" in item) {
      const updatedShop: Shop = {
        ...newShop,
        aisles: newShop.aisles.map((aisle) => ({
          ...aisle,
          products: aisle.products.map((product) =>
            product.id === item.id ? { ...product, name: newName } : product
          ),
        })),
      };

      setNewShop(updatedShop);
    }
  };

  return (
    <div className="flex w-full justify-between items-center">
      {isEditing ? (
        <>
          <input
            type="text"
            value={item.name}
            onChange={handleEditName}
            className="py-1 px-2 border border-gray-300 rounded-md w-3/4"
          />
          <button
            className="border-primary border text-primary rounded-md h-fit p-1"
            onClick={() => setIsEditing(false)}
          >
            <EditIcon width={20} height={20} />
          </button>
        </>
      ) : (
        <>
          <span>{item.name}</span>
          <div className="flex gap-2">
            <button
              className="text-black rounded h-fit"
              onClick={() => setIsEditing(true)}
            >
              <EditIcon width={20} height={20} />
            </button>
            {handleOpenAddSubItem && (
              <button className="text-primary rounded h-fit">
                <AddIcon
                  width={20}
                  height={20}
                  onClick={() => handleOpenAddSubItem(item)}
                />
              </button>
            )}
            <button
              className="text-danger rounded-md"
              onClick={() => handleDeleteItem(item.id)}
            >
              <Trashcan width={20} height={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddedItem;
