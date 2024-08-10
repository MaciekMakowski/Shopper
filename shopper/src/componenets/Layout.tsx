import Header from "@/componenets/Header";
import { FC, ReactNode } from "react";
import Menu from "./Menu";
interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <main className="flex h-full">
        <Menu />
        <div className="w-full h-full bg-white-soft">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
