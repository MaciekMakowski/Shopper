import { Dispatch, SetStateAction } from "react";
import { Aisle, Product, Shop } from "./shop";

interface NewAisle {
  isAddingAisle: boolean;
  newAisle: Aisle;
  setNewAisle: (newAisle: Aisle) => void;
  handleAddAisleToShop: () => void;
}

interface AddedItemsProps {
  item: Aisle | Product;
  newShop: Shop;
  setNewShop: Dispatch<SetStateAction<Shop>>;
  handleDeleteItem: (id: string) => void;
  handleOpenAddSubItem?: (item: Aisle | Product) => void;
  hangeAislePosition?: (aisle: Aisle, position: "up" | "down") => void;
}

interface NewProduct {
  newProduct: Product;
  isAddingProduct: boolean;
  setNewProduct: Dispatch<SetStateAction<Product>>;
  handleAddProductToAisle: (aisle: Aisle) => void;
  activeAisle: Aisle | null;
  allProducts: Product[];
}

interface AisleColumnProps {
  isAddingAisle: boolean;
  setIsAddingAisle: Dispatch<SetStateAction<boolean>>;
  newAisle: Aisle;
  setNewAisle: Dispatch<SetStateAction<Aisle>>;
  handleAddAisleToShop: () => void;
  newShop: Shop;
  setNewShop: Dispatch<SetStateAction<Shop>>;
  handleDeleteAisle: (id: string) => void;
  handleOpenAddProduct: (aisle: Aisle) => void;
  hangeAislePosition: (aisle: Aisle, position: "up" | "down") => void;
}

interface ProductColumnProps {
  activeAisle: Aisle | null;
  isAddingAisle: boolean;
  isAddingProduct: boolean;
  setIsAddingProduct: Dispatch<SetStateAction<boolean>>;
  newProduct: Product;
  newShop: Shop;
  setNewShop: Dispatch<SetStateAction<Shop>>;
  setNewProduct: Dispatch<SetStateAction<Product>>;
  handleAddProductToAisle: (aisle: Aisle) => void;
  handleDeleteProduct: (id: string) => void;
  getProducts: (aisle: Aisle) => Product[];
  allProducts: Product[];
}

export {
  AddedItemsProps,
  AisleColumnProps,
  NewAisle,
  NewProduct,
  ProductColumnProps,
};
