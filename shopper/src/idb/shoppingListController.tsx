import { ShoppingList } from "@/interfaces/shoppingList";
import initDB from "./IdbController";

export const saveShoppingList = async (shoppingList: ShoppingList) => {
  const db = await initDB();
  const tx = db.transaction("shoppingLists", "readwrite");
  const store = tx.objectStore("shoppingLists");
  await store.add(shoppingList);
  await tx.done;
};

export const updateShoppingList = async (shoppingList: ShoppingList) => {
  const db = await initDB();
  const tx = db.transaction("shoppingLists", "readwrite");
  const store = tx.objectStore("shoppingLists");
  await store.put(shoppingList);
  await tx.done;
};

export const getShoppingList = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("shoppingLists", "readonly");
  const store = tx.objectStore("shoppingLists");
  const shoppingList = await store.get(id);
  await tx.done;
  return shoppingList;
};

export const getAllShoppingLists = async (): Promise<ShoppingList[]> => {
  const db = await initDB();
  const tx = db.transaction("shoppingLists", "readonly");
  const store = tx.objectStore("shoppingLists");
  const shoppingLists = await store.getAll();
  await tx.done;
  return shoppingLists as ShoppingList[];
};

export const deleteShoppingList = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("shoppingLists", "readwrite");
  const store = tx.objectStore("shoppingLists");
  await store.delete(id);
  await tx.done;
};

export const getLastShoppingList = async (): Promise<ShoppingList> => {
  const db = await initDB();
  const tx = db.transaction("shoppingLists", "readonly");
  const store = tx.objectStore("shoppingLists");
  const shoppingLists = await store.getAll();
  await tx.done;
  return shoppingLists[shoppingLists.length - 1];
};
