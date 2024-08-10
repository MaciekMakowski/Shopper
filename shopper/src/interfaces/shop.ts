interface Shop {
  id: string;
  name: string;
  location: string;
  description: string;
  aisles: Aisle[];
}

interface Aisle {
  id: string;
  name: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
}

export { Aisle, Product, Shop };
