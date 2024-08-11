import AddIcon from "@/assets/icons/addIcon.svg?react";
import CloseIcon from "@/assets/icons/closeIcon.svg?react";
import AddProduct from "@/components/addShop/AddProduct";
import AddedItem from "@/components/addShop/AddedItem";
import { ProductColumnProps } from "@/interfaces/addShop";
import { FC } from "react";

const ProductColumn: FC<ProductColumnProps> = ({
  activeAisle,
  isAddingProduct,
  setIsAddingProduct,
  newProduct,
  setNewProduct,
  newShop,
  setNewShop,
  handleAddProductToAisle,
  handleDeleteProduct,
  getProducts,
  allProducts,
}) => {
  return (
    <>
      {activeAisle && (
        <div className="flex flex-col gap-4 bg-white shadow-md h-full p-4 rounded-md">
          <header>
            <div className="flex w-full justify-between">
              <h2 className="text-2xl font-bold font-secondary">
                Products for {activeAisle.name}
              </h2>
              <button
                className={`${
                  isAddingProduct ? "bg-warning" : "bg-primary"
                } p-2 flex rounded h-fit`}
                onClick={() => setIsAddingProduct(!isAddingProduct)}
              >
                {isAddingProduct ? (
                  <CloseIcon className="text-white" width={20} height={20} />
                ) : (
                  <AddIcon className="text-white" width={20} height={20} />
                )}
              </button>
            </div>
            <p> Here you can see aisles added to your shop </p>
          </header>
          <AddProduct
            isAddingProduct={isAddingProduct}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleAddProductToAisle={handleAddProductToAisle}
            activeAisle={activeAisle}
            allProducts={allProducts}
          />
          <div className="flex flex-col gap-2">
            {activeAisle &&
              getProducts(activeAisle).map((product) => (
                <AddedItem
                  key={product.id}
                  item={product}
                  handleDeleteItem={() => handleDeleteProduct(product.id)}
                  newShop={newShop}
                  setNewShop={setNewShop}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductColumn;
