import { Dispatch, ReactNode, SetStateAction } from "react";
import { Aisle, Shop } from "./shop";
import { ProductInList, ShoppingList } from "./shoppingList";
interface AccordionProps {
  head: ReactNode;
  children: ReactNode;
  buttons?: ReactNode;
}

interface ShopDropdownProps {
  shops: Shop[];
  setNewShoppingList: Dispatch<SetStateAction<ShoppingList>>;
  newShoppingList: ShoppingList;
  setProducts: Dispatch<SetStateAction<ProductInList[]>>;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

interface AddProductModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  newProduct: ProductInList;
  setNewProduct: Dispatch<SetStateAction<ProductInList>>;
  newAisle: Aisle;
  setNewAisle: Dispatch<SetStateAction<Aisle>>;
  addNewAisle: () => void;
  handleSaveProduct: () => void;
  newShoppingList: ShoppingList;
}

export { AccordionProps, AddProductModalProps, ModalProps, ShopDropdownProps };
