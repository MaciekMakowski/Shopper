import { v4 as uuidv4 } from "uuid";
import { Aisle, Product, Shop } from "../interfaces/shop";
const emptyShop: Shop = {
  id: uuidv4(),
  name: "",
  description: "",
  location: "",
  aisles: [],
};

const emptyAisle: Aisle = {
  id: uuidv4(),
  name: "",
  products: [],
};

const emptyProduct: Product = {
  id: uuidv4(),
  name: "",
};

export { emptyAisle, emptyProduct, emptyShop };
