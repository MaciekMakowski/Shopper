import EditIcon from "@/assets/icons/editIcon.svg?react";
import ExportIcon from "@/assets/icons/export.svg?react";
import Delete from "@/assets/icons/trashcan.svg?react";
import {
  deleteShoppingList,
  getAllShoppingLists,
} from "@/idb/shoppingListController";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductInList, ShoppingList } from "../interfaces/shoppingList";
const ShoppingLists = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const navigate = useNavigate();
  const handleGetShoppingLists = async () => {
    const shoppingLists = await getAllShoppingLists();
    if (!shoppingLists || shoppingLists.length === 0) return;
    setShoppingLists(shoppingLists);
  };

  const handleDeleteShoppingList = (id: string) => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== id));
    deleteShoppingList(id);
  };

  useEffect(() => {
    handleGetShoppingLists();
  }, []);

  const exportToStorage = (products: ProductInList[]) => {
    let currentAisle = "";
    const listFromProductsAsText = products
      .map((product) => {
        let result = "";
        if (product.aisle !== currentAisle) {
          currentAisle = product.aisle;
          result += `${currentAisle}:\n`;
        }
        result += `  ${product.product.name} - ${product.quantity}`;
        return result;
      })
      .join("\n");

    navigator.clipboard.writeText(listFromProductsAsText);
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <h1 className="text-3xl font-bold font-secondary">Shopping Lists</h1>
      <p>Here you can see list of all your shopping lists</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-8 max-h-[70vh] overflow-y-auto">
        {shoppingLists.map((shoppingList) => (
          <li
            key={shoppingList.id}
            className="p-4 bg-white shadow-md rounded-md flex gap-2 flex-col"
          >
            <div className="flex justify-between">
              <span className="font-semibold text-xl">{shoppingList.name}</span>
              <div className="flex gap-2">
                <ExportIcon
                  className="cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() => exportToStorage(shoppingList.products)}
                />
                <EditIcon
                  className="cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() =>
                    navigate(`/edit-shopping-list/${shoppingList.id}`)
                  }
                />
                <Delete
                  className="cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() => handleDeleteShoppingList(shoppingList.id)}
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
                  <span className="text-center">{product.product.name}</span>
                  <span className="text-center">{product.quantity}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingLists;
