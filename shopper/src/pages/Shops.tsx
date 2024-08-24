import ShopTable from "@/components/ShopTable";
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
    <div className="flex flex-col gap-4 p-4 overflow-hidden w-full">
      <h1 className="text-3xl font-bold font-secondary w-full">Shops</h1>
      <p>List of all your shops</p>
      <div className=" overflow-x-auto">
        <ShopTable shops={shops} onDelete={handleDeleteShop} />
      </div>
    </div>
  );
};

export default Shops;
