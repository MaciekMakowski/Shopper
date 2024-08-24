import Header from "@/components/shared/Header";
import { FC, ReactNode, useState } from "react";
import Menu from "../Menu";

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-[100vh]">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <main className="flex h-full">
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="w-full h-full bg-white-soft">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
