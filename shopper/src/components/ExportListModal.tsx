import { ProductInList, ShoppingList } from "@/interfaces/shoppingList";
import { Dispatch, FC, SetStateAction } from "react";
import Modal from "./shared/Modal";

interface ExportListModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  list: ShoppingList;
}

const ExportListModal: FC<ExportListModalProps> = ({
  isOpen,
  setIsOpen,
  list,
}) => {
  const exportAsFile = () => {
    const blob = new Blob([JSON.stringify(list, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${list.name || "list"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToStorage = () => {
    let currentAisle = "";
    const listFromProductsAsText = list.products
      .map((product: ProductInList) => {
        let result = "";
        if (product.aisle !== currentAisle) {
          currentAisle = product.aisle;
          result += `${currentAisle}:\n`;
        }
        result += `  ${product.product.name} - ${product.quantity}`;
        return result;
      })
      .join("\n");

    navigator.clipboard.writeText(listFromProductsAsText);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-xl">Export List</h3>
        <div className="flex justify-between gap-8">
          <button
            onClick={() => exportToStorage()}
            className="border-2 border-primary px-4 py-2 rounded-md"
          >
            Export to clipboard
          </button>
          <button
            onClick={() => exportAsFile()}
            className="bg-primary px-4 py-2 rounded-md text-white"
          >
            Export as file
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportListModal;
