import DeleteIcon from "@/assets/icons/trashcan.svg?react";
import AreYouSureModal from "@/components/shared/AreYouSureModal";
import { deleteProduct, getAllProducts } from "@/idb/productsController";
import { Product } from "@/interfaces/shop";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) return setFilteredProducts(products);
    const filteredProductsLocal = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filteredProductsLocal);
  };

  const handleGetProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
    setFilteredProducts(products);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">Products</h1>
      <div className="w-full flex justify-between md:items-center flex-col md:flex-row items-start gap-2">
        <p>Here you can see list of all added products</p>
        <input
          type="text"
          placeholder="Search product"
          className="p-2 border border-gray-300 rounded-md"
          onChange={handleSearchProduct}
        />
      </div>
      <ul className="flex flex-wrap gap-2 max-h-[65vh] md:max-h-[70vh] pb-2 overflow-y-auto">
        {filteredProducts.map((product) => (
          <li
            key={product.id}
            className="p-2 border border-primary rounded-md w-fit flex items-center gap-2 bg-stone-50 shadow-md"
          >
            {product.name}
            <AreYouSureModal
              onConfirm={() => handleDeleteProduct(product.id)}
              title="Delete Product"
              message="Are you sure you want to delete this product?"
              trigger={<DeleteIcon />}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Products;
