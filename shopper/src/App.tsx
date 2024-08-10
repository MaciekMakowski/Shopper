import "@/assets/styles.css";
import Layout from "@/componenets/Layout";
import AddShop from "@/pages/AddShop";
import Home from "@/pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Shops from "./pages/Shops";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addShop" element={<AddShop />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
