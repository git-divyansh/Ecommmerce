import AuthenticationPage from "./pages/AuthenticationPage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/login-register/Register";
import ProductListingPage from "./pages/ProductListingPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthenticationPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/product-listing" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
