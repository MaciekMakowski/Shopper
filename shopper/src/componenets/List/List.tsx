import Header from "@/componenets/List/Header";
import { ListProps } from "@/interfaces/homeList";
import { FC } from "react";
const List: FC<ListProps> = ({ header, items }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">
      <Header
        text={header.text}
        onClick={header.onClick}
        description={header.description}
      />
      {items}
    </div>
  );
};

export default List;
