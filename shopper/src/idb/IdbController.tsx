import { openDB } from "idb";

const initDB = async () => {
  const db = await openDB("userData", 5, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("shops")) {
        const shopsStore = db.createObjectStore("shops", { keyPath: "id" });
        shopsStore.createIndex("nameIndex", "name", { unique: false });
      }

      if (!db.objectStoreNames.contains("products")) {
        const productsStore = db.createObjectStore("products", {
          keyPath: "id",
        });
        productsStore.createIndex("nameIndex", "name", { unique: true });
      }

      if (!db.objectStoreNames.contains("shoppingLists")) {
        const shoppingListsStore = db.createObjectStore("shoppingLists", {
          keyPath: "id",
        });
        shoppingListsStore.createIndex("nameIndex", "name", { unique: false });
        shoppingListsStore.createIndex("dateIndex", "date", { unique: false });
      }
    },
  });

  return db;
};

export default initDB;
