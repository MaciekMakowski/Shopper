import ShopConfiguration from "@/components/ShopConfiguration";
import { useParams } from "react-router-dom";
const AddShop = () => {
  const shopId = useParams<{ id: string }>().id;
  return (
    <div className="flex flex-col gap-4 p-4 relative">
      <h1 className="text-3xl font-bold font-secondary">
        {shopId ? "Edit Shop" : "New Shop"}
      </h1>
      {shopId ? (
        <p>Here you can edit your shop</p>
      ) : (
        <p>Here you can add new shop to your database</p>
      )}
      <ShopConfiguration />
    </div>
  );
};

export default AddShop;
