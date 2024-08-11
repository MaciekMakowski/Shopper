import { getAllShoppingLists } from "@/idb/shoppingListController";
import { useEffect, useState } from "react";
import { ShoppingList } from "../interfaces/shoppingList";

const ShoppingLists = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  const handleGetShoppingLists = async () => {
    const shoppingLists = await getAllShoppingLists();
    if (!shoppingLists || shoppingLists.length === 0) return;
    setShoppingLists(shoppingLists);
  };

  useEffect(() => {
    handleGetShoppingLists();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <h1 className="text-3xl font-bold font-secondary">Shopping Lists</h1>
      <p>Here you can see list of all your shopping lists</p>
      <ul className="grid grid-cols-4 w-full">
        {shoppingLists.map((shoppingList) => (
          <li
            key={shoppingList.id}
            className="p-4 bg-white shadow-md rounded-md flex gap-2 flex-col"
          >
            <span className="font-semibold text-xl">{shoppingList.name}</span>
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
