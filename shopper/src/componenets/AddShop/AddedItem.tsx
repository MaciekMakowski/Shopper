import AddIcon from "@/assets/icons/addIcon.svg?react";
import Trashcan from "@/assets/icons/trashcan.svg?react";
import { AddedItemsProps } from "@/interfaces/addShop";
import { FC } from "react";

const AddedItem: FC<AddedItemsProps> = ({
  item,
  handleDeleteItem,
  handleOpenAddSubItem,
}) => {
  return (
    <div className="flex w-full justify-between">
      <span>{item.name}</span>
      <div className="flex gap-2">
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
    </div>
  );
};

export default AddedItem;
