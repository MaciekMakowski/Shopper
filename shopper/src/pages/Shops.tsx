import ShopTable from "@/components/ShopTable";
import { deleteShop, getAllShops, saveShop } from "@/idb/shopController";
import { ShopSchema } from "@/zod/validators";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Shop } from "../interfaces/shop";
const Shops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getShops = async () => {
    const shopsList = await getAllShops();
    if (!shopsList || shopsList.length === 0) return;
    setShops(shopsList);
  };

  const handleDeleteShop = (id: string) => {
    setShops(shops.filter((shop) => shop.id !== id));
    deleteShop(id);
    toast.success("Shop deleted successfully");
  };

  useEffect(() => {
    getShops();
  }, []);

  const handleImportShop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const validatedShop = ShopSchema.parse(jsonData);

      validatedShop.id = uuidv4();
      await saveShop(validatedShop);

      setShops((prev) => [...prev, validatedShop]);
      toast.success("Shop imported successfully");
    } catch (error) {
      console.error("Erron:", error);
      toast.error("Invalid file format");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4 p-4 overflow-hidden w-full">
      <h1 className="text-3xl font-bold font-secondary w-full">Shops</h1>
      <div className="flex justify-between w-full items-center">
        <p>List of all your shops</p>
        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImportShop}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            onClick={triggerFileInput}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Import
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <ShopTable shops={shops} onDelete={handleDeleteShop} />
      </div>
    </div>
  );
};

export default Shops;
