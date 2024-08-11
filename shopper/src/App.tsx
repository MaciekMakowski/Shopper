import "@/assets/styles.css";
import Layout from "@/components/shared/Layout";
import AddShop from "@/pages/AddShop";
import Home from "@/pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddShoppingList from "./pages/AddShoppingList";
import Products from "./pages/Products";
import Shops from "./pages/Shops";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-shop" element={<AddShop />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/edit-shop/:id" element={<AddShop />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-shopping-list" element={<AddShoppingList />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
