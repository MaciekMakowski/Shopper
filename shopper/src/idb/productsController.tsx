import { Product } from "@/interfaces/shop";
import normalizeProductName from "@/utils/normalizeName";
import initDB from "./IdbController";

export const addProduct = async (product: Product) => {
  const db = await initDB();
  const tx = db.transaction("products", "readwrite");
  const store = tx.objectStore("products");

  const normalizedProductName = normalizeProductName(product.name);

  const existingProduct = await store
    .index("nameIndex")
    .get(normalizedProductName);

  if (!existingProduct) {
    await store.add({ ...product, name: normalizedProductName });
  }

  await tx.done;
};

export const addProducts = async (products: Product[]) => {
  const db = await initDB();
  const tx = db.transaction("products", "readwrite");
  const store = tx.objectStore("products");

  for (const product of products) {
    const normalizedProductName = normalizeProductName(product.name);

    const existingProduct = await store
      .index("nameIndex")
      .get(normalizedProductName);

    if (!existingProduct) {
      await store.add({ ...product, name: normalizedProductName });
    }
  }

  await tx.done;
};

export const updateProduct = async (product: Product) => {
  const db = await initDB();
  const tx = db.transaction("products", "readwrite");
  const store = tx.objectStore("products");

  const normalizedProductName = normalizeProductName(product.name);

  const existingProduct = await store.get(product.id);

  if (existingProduct) {
    await store.put({ ...existingProduct, name: normalizedProductName });
  }

  await tx.done;
};

export const deleteProduct = async (id: string) => {
  const db = await initDB();
  const tx = db.transaction("products", "readwrite");
  const store = tx.objectStore("products");

  await store.delete(id);
  await tx.done;
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
  const db = await initDB();
  const tx = db.transaction("products", "readonly");
  const store = tx.objectStore("products");

  const product = await store.get(id);
  await tx.done;
  return product;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const db = await initDB();
  const tx = db.transaction("products", "readonly");
  const store = tx.objectStore("products");

  const products = await store.getAll();
  await tx.done;
  return products;
};
