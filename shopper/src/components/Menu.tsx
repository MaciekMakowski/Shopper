import { MenuProps } from "@/interfaces/menu";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
const Menu: FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("/");
  const handleActive = (path: string) => {
    setActive(path);
    navigate(path);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isActive = (path: string) => {
    return active === path ? "text-lime-500" : "";
  };
  return (
    <motion.nav
      initial={{ width: isMobile ? 0 : "250px" }}
      animate={{ width: isMobile && isMenuOpen ? 250 : isMobile ? 0 : "250px" }}
      transition={{ duration: 0.3 }}
      className={`z-30 absolute md:relative md:w-64 shadow-md bg-white-soft h-[100vh] md:h-auto overflow-hidden ${
        isMenuOpen && isMobile ? "w-[250px]" : "w-0"
      }`}
    >
      <ul className="flex flex-col gap-4 p-4 font-secondary">
        <li
          className={`font-medium text-xl cursor-pointer py-2 border-b border-dashed ${isActive(
            "/"
          )}`}
          onClick={() => handleActive("/")}
        >
          Home
        </li>
        <li
          className={`font-medium text-xl cursor-pointer py-2 border-b border-dashed ${isActive(
            "/shops"
          )}`}
          onClick={() => handleActive("/shops")}
        >
          Shops
        </li>
        <li
          className={`font-medium text-xl cursor-pointer py-2 border-b border-dashed ${isActive(
            "/shopping-lists"
          )}`}
          onClick={() => handleActive("/shopping-lists")}
        >
          Shopping Lists
        </li>
        <li
          className={`font-medium text-xl cursor-pointer py-2 border-b border-dashed ${isActive(
            "/products"
          )}`}
          onClick={() => handleActive("/products")}
        >
          Products
        </li>
        <li
          className={`font-medium text-xl cursor-pointer py-2 border-b border-dashed ${isActive(
            "/recepiees"
          )}`}
          onClick={() => handleActive("/recepiees")}
        >
          Recepiees
        </li>
      </ul>
    </motion.nav>
  );
};
export default Menu;
