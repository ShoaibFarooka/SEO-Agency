import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import FAQs from "./Pages/FAQs";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import PricePackages from "./Pages/PricePackages";
import Checkout from "./Pages/Checkout";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Banner from "./Components/Banner";

function App() {
  // const [count, setCount] = useState(0);
  const [Cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [price, setprice] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('Show: ', showCart);
  console.log('Price: ',price);

  //Function to handle Cart
  const handleCart = (cart_items) => {
    console.log('Cart from App.js: ', cart_items);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <div className="App">
      {/* <div className="header bg-slate-950"> */}
      <Navbar function_={setShowCart} />
      {/* <Banner /> */}
      {/* </div> */}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/prices" element={<PricePackages function_={handleCart} setprice={setprice} showCheckout={setIsAuthenticated} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/Checkout" element={isAuthenticated ? <Checkout price={price} /> : <PricePackages function_={handleCart} setprice={setprice} showCheckout={setIsAuthenticated}/>} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  );
}

export default App;
