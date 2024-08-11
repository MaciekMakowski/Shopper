import { ShoppingList } from "@/interfaces/shoppingList";
import { emptyShop } from "./addShop";
const emptyShoppingList: ShoppingList = {
  id: "",
  name: "",
  date: "",
  shop: emptyShop,
  products: [],
};

export { emptyShoppingList };
