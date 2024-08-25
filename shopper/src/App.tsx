import "@/assets/styles.css";
import Layout from "@/components/shared/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedRoutes from "./components/AnimatedRoutes";
const App = () => {
  return (
    <Router>
      <Layout>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={4}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;
