import { Shop } from "@/interfaces/shop";
import initDB from "./IdbController";
export const saveShop = async (shop: Shop) => {
  const db = await initDB();
  const tx = db.transaction("shops", "readwrite");
  const store = tx.objectStore("shops");
  await store.add(shop);
  await tx.done;
};

export const updateShop = async (shop: Shop) => {
  const db = await initDB();
  const tx = db.transaction("shops", "readwrite");
  const store = tx.objectStore("shops");
  await store.put(shop);
  await tx.done;
};

export const getShop = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("shops", "readonly");
  const store = tx.objectStore("shops");
  const shop = await store.get(id);
  await tx.done;
  return shop;
};

export const getAllShops = async (): Promise<Shop[]> => {
  const db = await initDB();
  const tx = db.transaction("shops", "readonly");
  const store = tx.objectStore("shops");
  const shops = await store.getAll();
  await tx.done;
  return shops as Shop[];
};

export const deleteShop = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("shops", "readwrite");
  const store = tx.objectStore("shops");
  await store.delete(id);
  await tx.done;
};
