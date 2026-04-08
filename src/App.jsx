import "./App.css";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </>
  );
}

export default App;
