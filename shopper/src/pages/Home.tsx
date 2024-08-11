import List from "@/components/list/List";
import { getAllShops } from "@/idb/shopController";
import { LastShoppingList, ShoppingList, ShopsList } from "@/mockups/home";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shop } from "../interfaces/shop";
const Home = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const navigate = useNavigate();

  const handleGetAllShops = async () => {
    const shops = await getAllShops();
    if (!shops || shops.length === 0) return;
    setShopsList(shops);
  };

  const handleGenerateShopList = (): ReactNode => {
    return shopsList.map((shop) => (
      <div key={shop.id} className="p-2 border-2 rounded-lg shadow-md">
        <h2 className="font-semibold">{shop.name}</h2>
        <p className="text-sm">{shop.location}</p>
      </div>
    ));
  };

  useEffect(() => {
    handleGetAllShops();
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
            text: ShoppingList.header.text,
            description: ShoppingList.header.description,
            onClick: () => navigate("/add-shopping-list"),
          }}
        >
          <p>Shopping list</p>
        </List>

        <List header={LastShoppingList.header}>
          <p>Last shopping list</p>
        </List>
      </div>
    </div>
  );
};

export default Home;
