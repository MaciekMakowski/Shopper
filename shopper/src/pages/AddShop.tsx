import ShopConfiguration from "@/componenets/ShopConfiguration";

const AddShop = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">New Shop</h1>
      <p>Here you can add new shop to your database</p>
      <ShopConfiguration />
    </div>
  );
};

export default AddShop;
