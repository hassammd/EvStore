import "./App.css";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import ThankYou from "./Pages/ThankYou";
import ErrorPage from "./Pages/ErrorPage";
import ProductsByCategory from "./Pages/ProductsByCategory";
import ScrollToTop from "./Components/ScrollToTop";
import Auth from "./Pages/Auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/AuthSlice/SignInSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/category/:productName"
            element={<ProductsByCategory />}
          />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
