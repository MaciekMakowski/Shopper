import AddIcon from "@/assets/icons/addIcon.svg?react";
import AddAisle from "@/componenets/AddShop/AddAisle";
import AddedAisle from "@/componenets/AddShop/AddedAisle";
import AddProduct from "@/componenets/AddShop/AddProduct";
import { Aisle, Product, Shop } from "@/interfaces/shop";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const emptyShop: Shop = {
  id: "",
  name: "",
  description: "",
  location: "",
  aisles: [],
};

const emptyAisle: Aisle = {
  id: "",
  name: "",
  products: [],
};

const emptyProduct: Product = {
  id: "",
  name: "",
};

const AddShop = () => {
  const [newShop, setNewShop] = useState<Shop>(emptyShop);
  const [newAisle, setNewAisle] = useState<Aisle>(emptyAisle);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [isAddingAisle, setIsAddingAisle] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [activeAisle, setActiveAisle] = useState<Aisle | null>(null);

  const handleAddAisleToShop = () => {
    setNewShop({
      ...newShop,
      aisles: [...newShop.aisles, { ...newAisle, id: uuidv4() }],
    });
    setNewAisle(emptyAisle);
  };

  const handleAddProductToAisle = (newAisle: Aisle) => {
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

  const handleOpenAddProduct = (aisle: Aisle) => {
    setActiveAisle(aisle);
    setIsAddingAisle(false);
    setIsAddingProduct(true);
  };

  const handleOpenAddAisle = () => {
    setIsAddingProduct(false);
    setIsAddingAisle(true);
  };

  useEffect(() => {
    console.log(newShop);
  }, [newShop]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">New Shop</h1>
      <p>Here you can add new shop to your database</p>
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="shopName">Shop Name</label>
          <input
            id="shopName"
            type="text"
            value={newShop.name}
            onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
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
        <div className="flex flex-col gap-2">
          <label htmlFor="shopName">Shop Location</label>
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
        <div className="flex flex-col gap-4 bg-white shadow-md h-full p-4 rounded-md">
          <header>
            <div className="flex w-full justify-between">
              <h2 className="text-2xl font-bold">Aisles</h2>
              <button
                className="bg-primary p-2 flex rounded h-fit"
                onClick={() => handleOpenAddAisle()}
              >
                <AddIcon className="text-white" width={20} height={20} />
              </button>
            </div>
            <p> Here you can see aisles added to your shop </p>
          </header>
          <div className="flex flex-col gap-2">
            {newShop.aisles &&
              newShop.aisles.map((aisle) => (
                <AddedAisle
                  key={aisle.id}
                  aisle={aisle}
                  handleDeleteAisle={handleDeleteAisle}
                  handleOpenAddProduct={handleOpenAddProduct}
                />
              ))}
          </div>
        </div>
        <AddAisle
          isAddingAisle={isAddingAisle}
          newAisle={newAisle}
          setNewAisle={setNewAisle}
          handleAddAisleToShop={() => handleAddAisleToShop()}
        />
        <AddProduct
          isAddingProduct={isAddingProduct}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProductToAisle={handleAddProductToAisle}
          activeAisle={activeAisle}
        />
      </div>
    </div>
  );
};

export default AddShop;
