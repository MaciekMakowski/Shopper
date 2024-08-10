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
interface ShopTableProps {
  shops: Shop[];
  onDelete: (id: string) => void;
}

export { Aisle, Product, Shop, ShopTableProps };
