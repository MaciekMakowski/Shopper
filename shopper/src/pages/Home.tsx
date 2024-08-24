import List from "@/components/list/List";
import { getAllShops } from "@/idb/shopController";
import {
  getAllShoppingLists,
  getLastShoppingList,
  updateShoppingList,
} from "@/idb/shoppingListController";
import { ProductInList, ShoppingList } from "@/interfaces/shoppingList";
import {
  LastShoppingList,
  ShoppingList as shList,
  ShopsList,
} from "@/mockups/home";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shop } from "../interfaces/shop";
const Home = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [lastShoppingList, setLastShoppingList] = useState<ShoppingList>();
  const navigate = useNavigate();

  const handleGetAllShops = async () => {
    const shops = await getAllShops();
    if (!shops || shops.length === 0) return;
    setShopsList(shops);
  };

  const handleGetShoppingList = async () => {
    const shoppingLists = await getAllShoppingLists();
    if (!shoppingLists || shoppingLists.length === 0) return;
    setShoppingLists(shoppingLists);
  };

  const handleGetLastShoppingList = async () => {
    const lastShoppingList = await getLastShoppingList();
    if (!lastShoppingList) return;
    setLastShoppingList(lastShoppingList);
  };

  const handleCheckProductBought = async (
    list: ShoppingList,
    product: ProductInList
  ) => {
    const updatedShoppingList = list.products.map((productInList) => {
      if (productInList.product.id === product.product.id) {
        return {
          ...productInList,
          isBought: !productInList.isBought,
        };
      }
      return productInList;
    });
    setLastShoppingList({
      ...list,
      products: updatedShoppingList,
    });
    await updateShoppingList({
      ...list,
      products: updatedShoppingList,
    });
  };

  const handleGenerateShopList = (): ReactNode => {
    return shopsList.map((shop) => (
      <div
        key={shop.id}
        className="p-2 border-2 rounded-lg shadow-md cursor-pointer"
        onClick={() => navigate("/edit-shop/" + shop.id)}
      >
        <h2 className="font-semibold">{shop.name}</h2>
        <p className="text-sm">{shop.location}</p>
      </div>
    ));
  };

  const handleGenerateShoppingList = (): ReactNode => {
    return shoppingLists.map((shoppingList) => (
      <div
        key={shoppingList.id}
        className="p-2 border-2 rounded-lg shadow-md cursor-pointer"
        onClick={() => navigate("/edit-shopping-list/" + shoppingList.id)}
      >
        <h2 className="font-semibold">{shoppingList.name}</h2>
        <p className="text-sm">{shoppingList.date}</p>
      </div>
    ));
  };

  const handleGenerateLastShoppingList = (): ReactNode => {
    if (!lastShoppingList) return <p>No shopping list found</p>;
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">{lastShoppingList.name}</h2>
          <p className="text-sm">{lastShoppingList.date}</p>
        </div>
        <div className="flex flex-col gap-2">
          {lastShoppingList.products.map((product, index) => (
            <div key={index} className="grid grid-cols-2 text-center">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={product.isBought}
                  onChange={() =>
                    handleCheckProductBought(lastShoppingList, product)
                  }
                />
                <p>{product.product.name}</p>
              </div>
              <p>{product.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    handleGetAllShops();
    handleGetShoppingList();
    handleGetLastShoppingList();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 max-h-[90vh] overflow-y-auto">
      <h1 className="text-3xl font-bold font-secondary">Home</h1>
      <p>Welcome to the home page</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <List
          header={{
            text: ShopsList.header.text,
            description: ShopsList.header.description,
            onClick: () => navigate("/add-shop"),
          }}
        >
          {handleGenerateShopList()}
        </List>
        <List
          header={{
            text: shList.header.text,
            description: shList.header.description,
            onClick: () => navigate("/add-shopping-list"),
          }}
        >
          {handleGenerateShoppingList()}
        </List>

        <List header={LastShoppingList.header}>
          {handleGenerateLastShoppingList()}
        </List>
      </div>
    </div>
  );
};

export default Home;
