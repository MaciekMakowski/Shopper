import EditIcon from "@/assets/icons/editIcon.svg?react";
import ExportIcon from "@/assets/icons/export.svg?react";
import Delete from "@/assets/icons/trashcan.svg?react";
import AreYouSureModal from "@/components/shared/AreYouSureModal";
import {
  deleteShoppingList,
  updateShoppingList,
} from "@/idb/shoppingListController";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/shop";
import { ShoppingList } from "../interfaces/shoppingList";
import ExportListModal from "./ExportListModal";

interface ShoppingListProps {
  shoppingList: ShoppingList;
  setShoppingLists: Dispatch<SetStateAction<ShoppingList[]>>;
  shoppingLists: ShoppingList[];
}

const ShoppingListItem: FC<ShoppingListProps> = ({
  shoppingList,
  setShoppingLists,
  shoppingLists,
}) => {
  const [open, setOpen] = useState(false);
  const isAllProductsBought = shoppingList.products.every(
    (product) => product.isBought
  );
  const navigate = useNavigate();
  const handleDeleteShoppingList = (id: string) => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== id));
    deleteShoppingList(id);
  };
  const handleCheckProductBought = async (
    shoppingList: ShoppingList,
    product: Product
  ) => {
    const updatedShoppingList = shoppingList.products.map((productInList) => {
      if (productInList.product.id === product.id) {
        return {
          ...productInList,
          isBought: !productInList.isBought,
        };
      }
      return productInList;
    });
    setShoppingLists(
      shoppingLists.map((list) => {
        if (list.id === shoppingList.id) {
          return { ...list, products: updatedShoppingList };
        }
        return list;
      })
    );
    await updateShoppingList({
      ...shoppingList,
      products: updatedShoppingList,
    });
  };
  return (
    <li
      key={shoppingList.id}
      className={`p-4 border border-gray-300  rounded-md ${
        isAllProductsBought ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex justify-between">
        <span className="font-semibold text-xl">{shoppingList.name}</span>
        <div className="flex gap-2">
          <ExportIcon
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => setOpen(true)}
          />
          <EditIcon
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => navigate(`/edit-shopping-list/${shoppingList.id}`)}
          />
          <AreYouSureModal
            onConfirm={() => handleDeleteShoppingList(shoppingList.id)}
            title="Delete Shopping List"
            message="Are you sure you want to delete this shopping list?"
            trigger={
              <Delete className="cursor-pointer" width={24} height={24} />
            }
          />
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <span>{shoppingList.shop.name}</span>
        <span className="text-sm">{shoppingList.date}</span>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="grid grid-cols-2 w-full">
          <span className="font-semibold text-center">Product</span>
          <span className="font-semibold text-center">Quantity</span>
        </li>
        {shoppingList.products.map((product, index) => (
          <li key={index} className="grid grid-cols-2 w-full">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={product.isBought}
                onChange={() =>
                  handleCheckProductBought(shoppingList, product.product)
                }
              />
              <span className="text-center">{product.product.name}</span>
            </div>
            <span className="text-center">{product.quantity}</span>
          </li>
        ))}
      </ul>
      <ExportListModal isOpen={open} setIsOpen={setOpen} list={shoppingList} />
    </li>
  );
};

export default ShoppingListItem;
