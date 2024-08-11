import { ShopDropdownProps } from "@/interfaces/components";
import { Shop } from "@/interfaces/shop";
import { FC, useState } from "react";

const ShopDropdown: FC<ShopDropdownProps> = ({
  shops,
  setNewShoppingList,
  newShoppingList,
  setProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (shop: Shop) => {
    setNewShoppingList({
      ...newShoppingList,
      shop,
    });
    setProducts(shop.aisles.flatMap((aisle) => aisle.products));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-gray-300 bg-white rounded-md w-full text-left"
      >
        {newShoppingList.shop.name || "Select shop"}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full border border-gray-300 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          {shops.map((shop: Shop) => (
            <li
              key={shop.id}
              onClick={() => handleSelect(shop)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex flex-col gap-1"
            >
              <span>{shop.name}</span>
              <small className="text-gray-500">{shop.location}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopDropdown;
