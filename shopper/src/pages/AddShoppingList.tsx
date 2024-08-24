import AddIcon from "@/assets/icons/addIcon.svg?react";
import TrashcanIcon from "@/assets/icons/trashcan.svg?react";
import AddProductModal from "@/components/addShoppingList/AddProductModal";
import ShopDropdown from "@/components/addShoppingList/ShopDropdown";
import { addProduct } from "@/idb/productsController";
import { getAllShops, updateShop } from "@/idb/shopController";
import {
  getShoppingList,
  saveShoppingList,
  updateShoppingList,
} from "@/idb/shoppingListController";
import { Aisle, Product, Shop } from "@/interfaces/shop";
import { ProductInList, ShoppingList } from "@/interfaces/shoppingList";
import { emptyAisle, emptyProduct } from "@/mockups/addShop";
import { emptyShoppingList } from "@/mockups/shoppingList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddShoppingList = () => {
  const shoppingListId = useParams<{ id: string }>().id;
  const [newShoppingList, setNewShoppingList] =
    useState<ShoppingList>(emptyShoppingList);
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newAisle, setNewAisle] = useState<Aisle>(emptyAisle);
  const [newProduct, setNewProduct] = useState<ProductInList>({
    id: "",
    product: emptyProduct,
    quantity: "",
    aisle: "",
  });
  const navigate = useNavigate();

  const handleGetShops = async () => {
    const shops = await getAllShops();
    if (!shops || shops.length === 0) return;
    setShops(shops);
  };

  const handleAddProduct = () => {
    if (newProduct.product.name === "")
      return alert("Please enter product name");
    if (newProduct.quantity === "") return alert("Please enter quantity");
    const product = products.find(
      (product) => product.name === newProduct.product.name
    );
    if (!product) {
      setIsOpen(true);
      return;
    }
    const aisle = newShoppingList.shop.aisles.find((aisle) =>
      aisle.products.find((product) => product.name === newProduct.product.name)
    );
    setNewShoppingList({
      ...newShoppingList,
      products: [
        ...newShoppingList.products,
        {
          id: uuidv4(),
          product: newProduct.product,
          quantity: newProduct.quantity,
          aisle: aisle?.name || "",
        },
      ],
    });
    setNewProduct({ id: "", product: emptyProduct, quantity: "", aisle: "" });
    setFilteredProducts([]);
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewProduct({
      ...newProduct,
      product: { ...emptyProduct, name: e.target.value },
    });

    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const addNewAisle = () => {
    if (newAisle.name === "") {
      alert("Please enter aisle name");
      return;
    }
    const aislesFromShop = newShoppingList.shop.aisles.map(
      (aisle) => aisle.name
    );
    if (!aislesFromShop.includes(newAisle.name)) {
      setNewShoppingList({
        ...newShoppingList,
        shop: {
          ...newShoppingList.shop,
          aisles: [
            ...newShoppingList.shop.aisles,
            {
              id: uuidv4(),
              name: newAisle.name,
              products: [],
            },
          ],
        },
      });
    }
    setNewAisle(emptyAisle);
  };

  const handleGenerateShoppingList = async () => {
    if (!newShoppingList.shop.name) return alert("Please select shop first");
    if (!newShoppingList.name) return alert("Please enter shopping list name");
    if (newShoppingList.products.length < 1)
      return alert("Please add products to shopping list");
    const ailesOrder = newShoppingList.shop.aisles.map((aisle) => aisle.name);
    const sortedProductsByAisle = newShoppingList.products.sort(
      (a, b) => ailesOrder.indexOf(a.aisle) - ailesOrder.indexOf(b.aisle)
    );

    if (shoppingListId) {
      const updatedShoppingList = {
        ...newShoppingList,
        products: sortedProductsByAisle,
      };
      await updateShoppingList(updatedShoppingList);
    } else {
      const shoppingList = {
        ...newShoppingList,
        id: uuidv4(),
        products: sortedProductsByAisle,
      };
      await saveShoppingList(shoppingList);
    }

    navigate("/shopping-lists");
  };

  const handleSaveProduct = () => {
    setIsOpen(false);
    const updatedShop = newShoppingList.shop;
    updatedShop.aisles = updatedShop.aisles.map((aisle) => {
      if (aisle.id === newProduct.aisle) {
        return {
          ...aisle,
          products: [
            ...aisle.products,
            {
              id: uuidv4(),
              name: newProduct.product.name,
            },
          ],
        };
      }
      return aisle;
    });
    setNewShoppingList({
      ...newShoppingList,
      shop: updatedShop,
      products: [
        ...newShoppingList.products,
        {
          id: uuidv4(),
          product: newProduct.product,
          quantity: newProduct.quantity,
          aisle: newProduct.aisle,
        },
      ],
    });

    updateShop(updatedShop);
    const productToAdd = updatedShop.aisles
      .find((aisle) => aisle.id === newProduct.aisle)
      ?.products.find((product) => product.name === newProduct.product.name);

    setNewProduct({ id: "", product: emptyProduct, quantity: "", aisle: "" });
    if (!productToAdd) return;
    addProduct(productToAdd);
  };

  const handleGetShoppingList = async (id: string) => {
    const shoppingList = await getShoppingList(id);
    setNewShoppingList(shoppingList);
    setProducts(
      shoppingList.shop.aisles.flatMap((aisle: Aisle) => aisle.products)
    );
  };

  const handleDeleteProductFromShoppingList = (id: string) => {
    const updatedShoppingList = newShoppingList.products.filter(
      (product) => product.id !== id
    );
    setNewShoppingList({
      ...newShoppingList,
      products: updatedShoppingList,
    });
  };

  useEffect(() => {
    handleGetShops();
    const toDay = new Date().toISOString().split("T")[0];
    setNewShoppingList({
      ...newShoppingList,
      date: toDay,
    });
    if (!shoppingListId) return;
    handleGetShoppingList(shoppingListId);
  }, []);
  return (
    <div className="flex flex-col gap-4 p-4 overflow-x-hidden h-full">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-bold font-secondary">New Shopping list</h1>
        <button
          className="p-1 border-primary border-2 text-primary rounded-md"
          onClick={() => handleGenerateShoppingList()}
        >
          Save
        </button>
      </div>
      <p>Here you can create new shopping list</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name">Name*</label>
            <input
              id="name"
              type="text"
              value={newShoppingList.name}
              onChange={(e) =>
                setNewShoppingList({
                  ...newShoppingList,
                  name: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="shop">Shop*</label>
            <ShopDropdown
              shops={shops}
              setNewShoppingList={setNewShoppingList}
              newShoppingList={newShoppingList}
              setProducts={setProducts}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={newShoppingList.date}
              onChange={(e) =>
                setNewShoppingList({
                  ...newShoppingList,
                  date: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Products</h2>
            <div className="flex flex-col gap-2 relative">
              <div className="flex gap-4 w-full">
                <div className="relative w-4/6">
                  <input
                    type="text"
                    placeholder="Product name"
                    value={newProduct.product.name}
                    onChange={handleProductNameChange}
                    className="p-2 border border-gray-300 rounded-md w-full"
                    disabled={newShoppingList.shop.name === ""}
                  />
                  {filteredProducts.length > 0 && (
                    <ul className="absolute z-10 top-12 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredProducts.map((product) => (
                        <li
                          key={product.id}
                          onClick={() => {
                            setNewProduct({
                              ...newProduct,
                              product: product,
                            });
                            setFilteredProducts([]);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {product.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  disabled={newShoppingList.shop.name === ""}
                  className="p-2 border border-gray-300 rounded-md w-2/6"
                />
                <button
                  className="p-2 bg-green-500 text-white rounded-md"
                  onClick={handleAddProduct}
                  disabled={newShoppingList.shop.name === ""}
                >
                  <AddIcon width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-white overflow-x-auto">
          <h2 className="text-xl font-semibold font-secondary">
            Added products
          </h2>
          <ul className="flex flex-col gap-2 min-w-[400px] w-full">
            <li className="p-2 grid grid-cols-4 gap-2">
              <span className="font-semibold text-center">Product</span>
              <span className="font-semibold text-center">Quantity</span>
              <span className="font-semibold text-center">Aisle</span>
              <span className="font-semibold text-center">Actions</span>
            </li>
            {newShoppingList.products.map((product) => (
              <li
                key={product.id}
                className="p-2 border border-gray-300 rounded-md grid grid-cols-4 gap-2 max-h-10"
              >
                <span className="text-center overflow-y-hidden overflow-x-auto no-scrollbar text-nowrap truncate">
                  {product.product.name}
                </span>
                <span className="text-center">{product.quantity}</span>
                <span className="text-center overflow-y-hidden overflow-x-auto no-scrollbar text-nowrap truncate">
                  {product.aisle}
                </span>
                <button
                  className="flex justify-center"
                  onClick={() =>
                    handleDeleteProductFromShoppingList(product.id)
                  }
                >
                  <TrashcanIcon width={24} height={24} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        newAisle={newAisle}
        setNewAisle={setNewAisle}
        addNewAisle={addNewAisle}
        handleSaveProduct={handleSaveProduct}
        newShoppingList={newShoppingList}
      />
    </div>
  );
};

export default AddShoppingList;
