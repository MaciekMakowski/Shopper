import AisleColumn from "@/componenets/AddShop/AisleColumn";
import ProductColumn from "@/componenets/AddShop/ProductColumn";
import { getShop, saveShop, updateShop } from "@/idb/shopController";
import { Aisle, Product, Shop } from "@/interfaces/shop";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addProducts } from "../idb/productsController";
import { emptyAisle, emptyProduct, emptyShop } from "../mockups/addShop";

const ShopConfiguration = () => {
  const navigate = useNavigate();
  const shopId = useParams<{ id: string }>().id;
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

  const hangeAislePosition = (aisle: Aisle, position: "up" | "down") => {
    const index = newShop.aisles.findIndex((a) => a.id === aisle.id);
    if (position === "up" && index === 0) return;
    if (position === "down" && index === newShop.aisles.length - 1) return;
    const aisles = [...newShop.aisles];
    const temp = aisles[index];
    aisles[index] = aisles[position === "up" ? index - 1 : index + 1];
    aisles[position === "up" ? index - 1 : index + 1] = temp;
    setNewShop({ ...newShop, aisles });
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

  const updateProducts = async () => {
    const allProducts = newShop.aisles.reduce(
      (acc, aisle) => [...acc, ...aisle.products],
      [] as Product[]
    );
    await addProducts(allProducts);
  };

  const handleSaveShop = () => {
    if (!validateShop()) return;
    if (!shopId) saveShop(newShop);
    else updateShop(newShop);
    updateProducts();
    navigate("/");
  };

  const getExistingShop = async (id: string) => {
    const shop = await getShop(id);
    if (!shop) return;
    setNewShop(shop);
  };

  useEffect(() => {
    if (!shopId) return;
    getExistingShop(shopId);
  }, [shopId]);

  return (
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
        setNewShop={setNewShop}
        handleDeleteAisle={handleDeleteAisle}
        handleOpenAddProduct={handleOpenAddProduct}
        hangeAislePosition={hangeAislePosition}
      />
      <ProductColumn
        activeAisle={activeAisle}
        isAddingAisle={isAddingAisle}
        isAddingProduct={isAddingProduct}
        setIsAddingProduct={setIsAddingProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        newShop={newShop}
        setNewShop={setNewShop}
        handleAddProductToAisle={handleAddProductToAisle}
        handleDeleteProduct={handleDeleteProduct}
        getProducts={getProducts}
      />
    </div>
  );
};

export default ShopConfiguration;
