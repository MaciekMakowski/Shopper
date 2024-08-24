import { HeaderProps } from "@/interfaces/header";
import { FC } from "react";

const Header: FC<HeaderProps> = ({ setIsMenuOpen }) => {
  return (
    <header
      className="flex px-20 justify-between py-4 border-primary border-b-4 shadow-md"
      onClick={() => setIsMenuOpen((prev) => !prev)}
    >
      <h1 className="font-semibold text-2xl italic font-secondary">Shopper</h1>
      <div className=" md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
          />
        </svg>
      </div>
    </header>
  );
};
export default Header;
