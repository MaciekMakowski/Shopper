import { Aisle, Product } from "./shop";

interface NewAisle {
  isAddingAisle: boolean;
  newAisle: Aisle;
  setNewAisle: (newAisle: Aisle) => void;
  handleAddAisleToShop: () => void;
}

interface AddedAisleProps {
  aisle: Aisle;
  handleDeleteAisle: (id: string) => void;
  handleOpenAddProduct: (aisle: Aisle) => void;
}

interface NewProduct {
  newProduct: Product;
  isAddingProduct: boolean;
  setNewProduct: (product: Product) => void;
  handleAddProductToAisle: (aisle: Aisle) => void;
  activeAisle: Aisle | null;
}

export { AddedAisleProps, NewAisle, NewProduct };
