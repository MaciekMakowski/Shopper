const ShopsList = {
  header: {
    text: "Shops",
    description: "List of shops",
    onClick: () => console.log("Add shop"),
  },
  items: [],
};

const ShoppingList = {
  header: {
    text: "Shopping List",
    description: "List of items to buy",
    onClick: () => console.log("Add item"),
  },
  items: [],
};

const LastShoppingList = {
  header: {
    text: "Last Shopping List",
    description: "List of items bought",
  },
  items: [],
};

export { LastShoppingList, ShoppingList, ShopsList };
