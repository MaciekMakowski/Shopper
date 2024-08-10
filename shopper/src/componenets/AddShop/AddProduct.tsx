import AddIcon from "@/assets/icons/addIcon.svg?react";
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
        <div className="flex gap-2">
          <input
            id="productName"
            type="text"
            value={newProduct.name}
            placeholder="Product Name"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <button
            className="p-2 rounded-md border-primary border-2"
            onClick={() => handleAddProductToAisle(activeAisle)}
          >
            <AddIcon className="text-primary" width={20} height={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default AddProduct;
