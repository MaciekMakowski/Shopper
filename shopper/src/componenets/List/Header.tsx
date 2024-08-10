import AddIcon from "@/assets/icons/addIcon.svg?react";
import { HeaderProps } from "@/interfaces/homeList";
import { FC } from "react";
const Header: FC<HeaderProps> = ({ text, description, onClick = null }) => {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex gap w-full justify-between items-center">
        <h2 className="text-xl font-bold py-2 font-secondary">{text}</h2>
        {onClick && (
          <button
            className="bg-primary p-2 flex rounded h-fit"
            onClick={onClick}
          >
            <AddIcon className="text-white" width={20} height={20} />
          </button>
        )}
      </div>
      <p>{description}</p>
    </header>
  );
};

export default Header;
