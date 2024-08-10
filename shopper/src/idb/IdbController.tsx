import { openDB } from "idb";

const initDB = async () => {
  const db = await openDB("userData", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("shops")) {
        db.createObjectStore("shops", { keyPath: "id" });
      }
    },
  });

  return db;
};

export default initDB;
