import { NewProduct } from "@/interfaces/addShop";
import { FC } from "react";
const AddProduct: FC<NewProduct> = ({
  newProduct,
  isAddingProduct,
  setNewProduct,
  handleAddProductToAisle,
  activeAisle,
}) => {
  return (
    <>
      {isAddingProduct && activeAisle && (
        <div className="flex flex-col gap-2">
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            className="py-2 bg-secondary rounded-md border-primary border-2"
            onClick={() => handleAddProductToAisle(activeAisle)}
          >
            Add Product
          </button>
        </div>
      )}
    </>
  );
};

export default AddProduct;
