const Menu = () => {
  return (
    <nav className="w-64 shadow-md">
      <ul className="flex flex-col gap-4 p-4 font-secondary">
        <li className="font-medium text-xl text-lime-500 cursor-pointer py-2 border-b border-dashed">
          Home
        </li>
        <li className="font-medium text-xl cursor-pointer py-2 border-b border-dashed">
          Products
        </li>
        <li className="font-medium text-xl cursor-pointer py-2 border-b border-dashed">
          Cart
        </li>
      </ul>
    </nav>
  );
};
export default Menu;
