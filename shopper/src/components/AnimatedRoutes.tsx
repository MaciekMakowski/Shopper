import AddShop from "@/pages/AddShop";
import AddShoppingList from "@/pages/AddShoppingList";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ShoppingLists from "@/pages/ShoppingLists";
import Shops from "@/pages/Shops";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5 };

const AnimatedRoutes: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/add-shop"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <AddShop />
            </motion.div>
          }
        />
        <Route
          path="/shops"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Shops />
            </motion.div>
          }
        />
        <Route
          path="/edit-shop/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <AddShop />
            </motion.div>
          }
        />
        <Route
          path="/products"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Products />
            </motion.div>
          }
        />
        <Route
          path="/add-shopping-list"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <AddShoppingList />
            </motion.div>
          }
        />
        <Route
          path="/edit-shopping-list/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <AddShoppingList />
            </motion.div>
          }
        />
        <Route
          path="/shopping-lists"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ShoppingLists />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <h1>404</h1>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
