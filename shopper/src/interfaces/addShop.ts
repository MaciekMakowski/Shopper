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
  setNewShop: (shop: Shop) => void;
  handleDeleteItem: (id: string) => void;
  handleOpenAddSubItem?: (item: Aisle | Product) => void;
  hangeAislePosition: (aisle: Aisle, position: "up" | "down") => void;
}

interface NewProduct {
  newProduct: Product;
  isAddingProduct: boolean;
  setNewProduct: (product: Product) => void;
  handleAddProductToAisle: (aisle: Aisle) => void;
  activeAisle: Aisle | null;
}

interface AisleColumnProps {
  isAddingAisle: boolean;
  setIsAddingAisle: (isAddingAisle: boolean) => void;
  newAisle: Aisle;
  setNewAisle: (newAisle: Aisle) => void;
  handleAddAisleToShop: () => void;
  newShop: Shop;
  setNewShop: (shop: Shop) => void;
  handleDeleteAisle: (id: string) => void;
  handleOpenAddProduct: (aisle: Aisle) => void;
  hangeAislePosition: (aisle: Aisle, position: "up" | "down") => void;
}

interface ProductColumnProps {
  activeAisle: Aisle | null;
  isAddingAisle: boolean;
  isAddingProduct: boolean;
  setIsAddingProduct: (isAddingProduct: boolean) => void;
  newProduct: Product;
  newShop: Shop;
  setNewShop: (shop: Shop) => void;
  setNewProduct: (product: Product) => void;
  handleAddProductToAisle: (aisle: Aisle) => void;
  handleDeleteProduct: (id: string) => void;
  getProducts: (aisle: Aisle) => Product[];
}

export {
  AddedItemsProps,
  AisleColumnProps,
  NewAisle,
  NewProduct,
  ProductColumnProps,
};
