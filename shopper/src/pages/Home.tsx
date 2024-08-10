import List from "@/componenets/List/List";
import { LastShoppingList, ShoppingList, ShopsList } from "@/mockups/home";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold font-secondary">Home</h1>
      <p>Welcome to the home page</p>
      <div className="grid grid-cols-3 gap-8">
        <List
          header={{
            text: ShopsList.header.text,
            description: ShopsList.header.description,
            onClick: () => navigate("/addShop"),
          }}
          items={ShopsList.items}
        />
        <List header={ShoppingList.header} items={ShoppingList.items} />
        <List header={LastShoppingList.header} items={LastShoppingList.items} />
      </div>
    </div>
  );
};

export default Home;
