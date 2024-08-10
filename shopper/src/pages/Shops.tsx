import ShopTable from "@/componenets/ShopTable";
import { deleteShop, getAllShops } from "@/idb/shopController";
import { useEffect, useState } from "react";
import { Shop } from "../interfaces/shop";

const Shops = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  const getShops = async () => {
    const shopsList = await getAllShops();
    if (!shopsList || shopsList.length === 0) return;
    setShops(shopsList);
  };

  const handleDeleteShop = (id: string) => {
    setShops(shops.filter((shop) => shop.id !== id));
    deleteShop(id);
  };

  useEffect(() => {
    getShops();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">Shops</h1>
      <p>List of all your shops</p>
      <ShopTable shops={shops} onDelete={handleDeleteShop} />
    </div>
  );
};

export default Shops;
