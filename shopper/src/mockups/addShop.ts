import { Aisle, Product, Shop } from "../interfaces/shop";

const emptyShop: Shop = {
  id: "",
  name: "",
  description: "",
  location: "",
  aisles: [],
};

const emptyAisle: Aisle = {
  id: "",
  name: "",
  products: [],
};

const emptyProduct: Product = {
  id: "",
  name: "",
};

export { emptyAisle, emptyProduct, emptyShop };
