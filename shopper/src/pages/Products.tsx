import { getAllProducts } from "@/idb/productsController";
import { Product } from "@/interfaces/shop";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleGetProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">Products</h1>
      <p>Here you can see list of all added products</p>
      <ul className="flex flex-wrap gap-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-2 border border-primary rounded-md w-fit"
          >
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Products;
