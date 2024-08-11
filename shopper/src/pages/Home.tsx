import List from "@/components/list/List";
import { getAllShops } from "@/idb/shopController";
import { getAllShoppingLists } from "@/idb/shoppingListController";
import { ShoppingList } from "@/interfaces/shoppingList";
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

  const handleGenerateShopList = (): ReactNode => {
    return shopsList.map((shop) => (
      <div key={shop.id} className="p-2 border-2 rounded-lg shadow-md">
        <h2 className="font-semibold">{shop.name}</h2>
        <p className="text-sm">{shop.location}</p>
      </div>
    ));
  };

  const handleGenerateShoppingList = (): ReactNode => {
    return shoppingLists.map((shoppingList) => (
      <div key={shoppingList.id} className="p-2 border-2 rounded-lg shadow-md">
        <h2 className="font-semibold">{shoppingList.name}</h2>
        <p className="text-sm">{shoppingList.date}</p>
      </div>
    ));
  };

  useEffect(() => {
    handleGetAllShops();
    handleGetShoppingList();
  }, []);
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">Home</h1>
      <p>Welcome to the home page</p>
      <div className="grid grid-cols-3 gap-8">
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
          <p>Last shopping list</p>
        </List>
      </div>
    </div>
  );
};

export default Home;
