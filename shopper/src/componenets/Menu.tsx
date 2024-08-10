import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-64 shadow-md">
      <ul className="flex flex-col gap-4 p-4 font-secondary">
        <li
          className="font-medium text-xl text-lime-500 cursor-pointer py-2 border-b border-dashed"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="font-medium text-xl cursor-pointer py-2 border-b border-dashed"
          onClick={() => navigate("/shops")}
        >
          Shops
        </li>
        <li
          className="font-medium text-xl cursor-pointer py-2 border-b border-dashed"
          onClick={() => navigate("/shopping-lists")}
        >
          Shopping Lists
        </li>
        <li
          className="font-medium text-xl cursor-pointer py-2 border-b border-dashed"
          onClick={() => navigate("/products")}
        >
          Products
        </li>
      </ul>
    </nav>
  );
};
export default Menu;
