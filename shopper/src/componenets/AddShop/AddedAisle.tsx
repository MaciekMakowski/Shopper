import AddIcon from "@/assets/icons/addIcon.svg?react";
import Trashcan from "@/assets/icons/trashcan.svg?react";
import Accordion from "@/componenets/Accordion";
import { AddedAisleProps } from "@/interfaces/addShop";
import { FC } from "react";

const AddedAisle: FC<AddedAisleProps> = ({
  aisle,
  handleDeleteAisle,
  handleOpenAddProduct,
}) => {
  return (
    <Accordion
      key={aisle.id}
      head={<span>{aisle.name}</span>}
      buttons={
        <div className="flex gap-2">
          <button
            className="text-primary rounded h-fit"
            onClick={() => handleOpenAddProduct(aisle)}
          >
            <AddIcon width={20} height={20} />
          </button>
          <button
            className="text-danger rounded-md"
            onClick={() => handleDeleteAisle(aisle.id)}
          >
            <Trashcan width={20} height={20} />
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-1 ml-4">
        {aisle.products.map((product) => (
          <div key={product.id} className="flex justify-between items-center">
            <span className="p-1 text-sm">{product.name}</span>
          </div>
        ))}
      </div>
    </Accordion>
  );
};

export default AddedAisle;
