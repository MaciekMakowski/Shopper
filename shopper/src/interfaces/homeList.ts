import { ReactNode } from "react";
interface HeaderProps {
  text: string;
  description: string;
  onClick?: () => void;
}

interface ListProps {
  header: HeaderProps;
  items: ReactNode[];
}

export { HeaderProps, ListProps };
