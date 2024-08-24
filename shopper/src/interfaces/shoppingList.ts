import { Product, Shop } from "./shop";

interface ShoppingList {
  id: string;
  name: string;
  date: string;
  shop: Shop;
  products: ProductInList[];
}

interface ProductInList {
  id: string;
  product: Product;
  quantity: string;
  aisle: string;
}

export { ProductInList, ShoppingList };
