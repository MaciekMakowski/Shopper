import { ReactNode } from "react";
interface HeaderProps {
  text: string;
  description: string;
  onClick?: () => void;
}

interface ListProps {
  header: HeaderProps;
  children: ReactNode;
}

export { HeaderProps, ListProps };
