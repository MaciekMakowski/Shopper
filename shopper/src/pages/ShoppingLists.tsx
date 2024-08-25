import ShoppingListItem from "@/components/ShoppingList";
import {
  getAllShoppingLists,
  saveShoppingList,
} from "@/idb/shoppingListController";
import { ShoppingListSchema } from "@/zod/validators";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ShoppingList } from "../interfaces/shoppingList";

const ShoppingLists = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  const handleGetShoppingLists = async () => {
    const lists = await getAllShoppingLists();
    if (!lists || lists.length === 0) return;
    setShoppingLists(lists);
  };

  const handleImportShoppingList = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const validatedList = ShoppingListSchema.parse(jsonData);

      validatedList.id = uuidv4();

      await saveShoppingList(validatedList);

      setShoppingLists((prev) => [...prev, validatedList]);
    } catch (error) {
      console.error("Error", error);
      alert("Invalid file format");
    }
  };

  useEffect(() => {
    handleGetShoppingLists();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 w-full relative">
      <h1 className="text-3xl font-bold font-secondary">Shopping Lists</h1>
      <p>Here you can see list of all your shopping lists</p>
      <div className="flex justify-between w-full items-center">
        <div className="absolute top-5 right-5">
          <input
            type="file"
            accept=".json"
            onChange={handleImportShoppingList}
            className="hidden"
            id="importShoppingList"
          />
          <label
            htmlFor="importShoppingList"
            className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md"
          >
            Import
          </label>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-8 max-h-[70vh] overflow-y-auto">
        {shoppingLists.map((shoppingList) => (
          <ShoppingListItem
            key={shoppingList.id}
            shoppingList={shoppingList}
            setShoppingLists={setShoppingLists}
            shoppingLists={shoppingLists}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShoppingLists;
