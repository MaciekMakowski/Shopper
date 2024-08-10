import AisleColumn from "@/componenets/AddShop/AisleColumn";
import ProductColumn from "@/componenets/AddShop/ProductColumn";
import { saveShop } from "@/idb/shopController";
import { Aisle, Shop } from "@/interfaces/shop";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { emptyAisle, emptyProduct, emptyShop } from "../mockups/addShop";

const AddShop = () => {
  const [newShop, setNewShop] = useState<Shop>({ ...emptyShop, id: uuidv4() });
  const [newAisle, setNewAisle] = useState<Aisle>(emptyAisle);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [isAddingAisle, setIsAddingAisle] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [activeAisle, setActiveAisle] = useState<Aisle | null>(null);

  const handleAddAisleToShop = () => {
    if (!newAisle.name) {
      alert("Aisle name is required");
      return;
    }
    setNewShop({
      ...newShop,
      aisles: [...newShop.aisles, { ...newAisle, id: uuidv4() }],
    });
    setNewAisle(emptyAisle);
  };

  const handleAddProductToAisle = (newAisle: Aisle) => {
    if (!newProduct.name) {
      alert("Product name is required");
      return;
    }
    setNewShop({
      ...newShop,
      aisles: newShop.aisles.map((aisle) =>
        aisle.id === newAisle.id
          ? {
              ...aisle,
              products: [...aisle.products, { ...newProduct, id: uuidv4() }],
            }
          : aisle
      ),
    });
    setNewProduct(emptyProduct);
  };

  const handleDeleteAisle = (id: string) => {
    setNewShop({
      ...newShop,
      aisles: newShop.aisles.filter((aisle) => aisle.id !== id),
    });
  };

  const handleDeleteProduct = (id: string) => {
    setNewShop({
      ...newShop,
      aisles: newShop.aisles.map((aisle) => ({
        ...aisle,
        products: aisle.products.filter((product) => product.id !== id),
      })),
    });
  };

  const handleOpenAddProduct = (aisle: Aisle) => {
    setActiveAisle(aisle);
    setIsAddingProduct(true);
  };

  const getProducts = (aisle: Aisle) => {
    return newShop.aisles.find((a) => a.id === aisle.id)?.products || [];
  };

  const validateShop = () => {
    if (!newShop.name || !newShop.location) {
      alert("Shop name and location are required");
      return false;
    }
    if (newShop.aisles.length === 0) {
      alert("Shop should have at least one aisle");
      return false;
    }
    if (newShop.aisles.some((aisle) => aisle.products.length === 0)) {
      alert("Aisle should have at least one product");
      return false;
    }
    if (
      newShop.aisles.some((aisle) =>
        aisle.products.some((product) => !product.name)
      )
    ) {
      alert("Product name is required");
      return false;
    }
    return true;
  };

  const handleSaveShop = () => {
    if (!validateShop()) return;
    saveShop(newShop);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">New Shop</h1>
      <p>Here you can add new shop to your database</p>
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="shopName">Shop Name*</label>
            <input
              id="shopName"
              type="text"
              value={newShop.name}
              onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="shopName">Shop Location*</label>
            <input
              id="shopName"
              type="text"
              value={newShop.location}
              onChange={(e) =>
                setNewShop({ ...newShop, location: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="shopName">Shop Description</label>
            <input
              id="shopDescription"
              type="text"
              value={newShop.description}
              onChange={(e) =>
                setNewShop({ ...newShop, description: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            className="px-6 py-2 bg-primary rounded-md text-white"
            onClick={() => handleSaveShop()}
          >
            Save Shop
          </button>
        </div>
        <AisleColumn
          isAddingAisle={isAddingAisle}
          setIsAddingAisle={setIsAddingAisle}
          newAisle={newAisle}
          setNewAisle={setNewAisle}
          handleAddAisleToShop={handleAddAisleToShop}
          newShop={newShop}
          handleDeleteAisle={handleDeleteAisle}
          handleOpenAddProduct={handleOpenAddProduct}
        />
        <ProductColumn
          activeAisle={activeAisle}
          isAddingAisle={isAddingAisle}
          isAddingProduct={isAddingProduct}
          setIsAddingProduct={setIsAddingProduct}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProductToAisle={handleAddProductToAisle}
          handleDeleteProduct={handleDeleteProduct}
          getProducts={getProducts}
        />
      </div>
    </div>
  );
};

export default AddShop;
