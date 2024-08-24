import AddIcon from "@/assets/icons/addIcon.svg?react";
import CloseIcon from "@/assets/icons/closeIcon.svg?react";
import AddProduct from "@/components/addShop/AddProduct";
import AddedItem from "@/components/addShop/AddedItem";
import { ProductColumnProps } from "@/interfaces/addShop";
import { motion } from "framer-motion";
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
    <motion.div
      className=" flex-col gap-4 bg-white shadow-md h-full p-4 rounded-md"
      initial={{ opacity: 0, x: -100, display: "none" }}
      animate={{
        opacity: activeAisle ? 1 : 0,
        x: activeAisle ? 0 : -100,
        display: activeAisle ? "flex" : "none",
      }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {activeAisle && (
        <>
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

          {isAddingProduct && (
            <motion.div
              key="add-product"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AddProduct
                isAddingProduct={isAddingProduct}
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                handleAddProductToAisle={handleAddProductToAisle}
                activeAisle={activeAisle}
                allProducts={allProducts}
              />
            </motion.div>
          )}

          <div className="flex flex-col gap-2">
            {getProducts(activeAisle).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <AddedItem
                  item={product}
                  handleDeleteItem={() => handleDeleteProduct(product.id)}
                  newShop={newShop}
                  setNewShop={setNewShop}
                />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProductColumn;
