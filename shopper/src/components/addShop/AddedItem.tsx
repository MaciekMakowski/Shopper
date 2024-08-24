import AddIcon from "@/assets/icons/addIcon.svg?react";
import IconDown from "@/assets/icons/downIcon.svg?react";
import EditIcon from "@/assets/icons/editIcon.svg?react";
import Trashcan from "@/assets/icons/trashcan.svg?react";
import IconUp from "@/assets/icons/upIcon.svg?react";
import { AddedItemsProps } from "@/interfaces/addShop";
import { Shop } from "@/interfaces/shop";
import { FC, useState } from "react";
import AreYouSureModal from "../shared/AreYouSureModal";
const AddedItem: FC<AddedItemsProps> = ({
  item,
  handleDeleteItem,
  handleOpenAddSubItem,
  newShop,
  setNewShop,
  hangeAislePosition,
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
    } else {
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
          <div className="flex gap-2">
            {"products" in item && hangeAislePosition && (
              <div>
                <button
                  className="text-primary rounded-md"
                  onClick={() => hangeAislePosition(item, "up")}
                >
                  <IconUp width={20} height={20} />
                </button>
                <button
                  className="text-primary rounded-md"
                  onClick={() => hangeAislePosition(item, "down")}
                >
                  <IconDown width={20} height={20} />
                </button>
              </div>
            )}
            <span>{item.name}</span>
          </div>
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
            <AreYouSureModal
              onConfirm={() => handleDeleteItem(item.id)}
              title="Delete Item"
              message="Are you sure you want to delete this item?"
              trigger={<Trashcan width={20} height={20} />}
              className="text-danger rounded-md"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AddedItem;
