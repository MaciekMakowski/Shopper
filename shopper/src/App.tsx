import "@/assets/styles.css";
import Layout from "@/componenets/Layout";
import AddShop from "@/pages/AddShop";
import Home from "@/pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Shops from "./pages/Shops";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addShop" element={<AddShop />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/editShop/:id" element={<AddShop />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
