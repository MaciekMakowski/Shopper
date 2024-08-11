import { ReactNode } from "react";
import { Aisle, Product, Shop } from "./shop";
import { ProductInList, ShoppingList } from "./shoppingList";
interface AccordionProps {
  head: ReactNode;
  children: ReactNode;
  buttons?: ReactNode;
}

interface ShopDropdownProps {
  shops: Shop[];
  setNewShoppingList: (newShoppingList: ShoppingList) => void;
  newShoppingList: ShoppingList;
  setProducts: (products: Product[]) => void;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

interface AddProductModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newProduct: ProductInList;
  setNewProduct: (newProduct: ProductInList) => void;
  newAisle: Aisle;
  setNewAisle: (newAisle: Aisle) => void;
  addNewAisle: () => void;
  handleSaveProduct: () => void;
  newShoppingList: ShoppingList;
}

export { AccordionProps, AddProductModalProps, ModalProps, ShopDropdownProps };
