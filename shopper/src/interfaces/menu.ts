import { Dispatch, SetStateAction } from "react";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export { MenuProps };
