import AddIcon from "@/assets/icons/addIcon.svg?react";
import { NewProduct } from "@/interfaces/addShop";
import { FC, useState } from "react";
const AddProduct: FC<NewProduct> = ({
  newProduct,
  isAddingProduct,
  setNewProduct,
  handleAddProductToAisle,
  activeAisle,
  allProducts,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewProduct({ ...newProduct, name: value });

    if (value.length > 0) {
      const filtered = allProducts
        .filter((product) =>
          product.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .map((product) => product.name);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <>
      {isAddingProduct && activeAisle && (
        <div className="flex flex-col gap-2 relative">
          <div className="flex gap-2 relative">
            <input
              id="productName"
              type="text"
              value={newProduct.name}
              placeholder="Product Name"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            <button
              className="p-2 rounded-md border-primary border-2"
              onClick={() => handleAddProductToAisle(activeAisle)}
            >
              <AddIcon className="text-primary" width={20} height={20} />
            </button>
          </div>
          {filteredProducts.length > 0 && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md z-10 max-h-60 overflow-y-auto">
              {filteredProducts.map((product: string, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setNewProduct({ ...newProduct, name: product });
                    setFilteredProducts([]);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {product}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default AddProduct;
