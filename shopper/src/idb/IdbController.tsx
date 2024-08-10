import { openDB } from "idb";

const initDB = async () => {
  const db = await openDB("userData", 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("shops")) {
        db.createObjectStore("shops", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("products")) {
        const productsStore = db.createObjectStore("products", {
          keyPath: "id",
        });
        productsStore.createIndex("nameIndex", "name", { unique: true });
      }
    },
  });

  return db;
};

export default initDB;
