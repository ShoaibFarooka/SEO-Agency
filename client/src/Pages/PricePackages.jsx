import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./PricePackages.scss";
import '../Styles/PricePackages.css';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { FcShipped } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';



// Set the app element for react-modal
Modal.setAppElement(document.body);
const all_products = [
  { name: "Premium SEO", price: '650$', quantity: 1 },
  { name: "Enterprise SEO", price: '2000$', quantity: 1 },
  { name: "Custom SEO", price: '3400$', quantity: 1 },
];

const PricePackages = ({ function_, setprice, showCheckout }) => {
  const [IsOpenPopup, setIsOpenPopup] = useState(false);
  const [IsOpenPopup2, setIsOpenPopup2] = useState(false);
  const [IsOpenPopup3, setIsOpenPopup3] = useState(false);
  const navigate = useNavigate();
  const [PackageNumber, setPackageNumber] = useState('');  //Default Package is first one
  const [Cart, setCart] = useState([]);
  const [ShowCart, setShowCart] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+1', // Default country code
    address: '',
    city: '',
    postalCode: '',
    country: '',
    deliveryNote: '',
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  // Add an event listener to the document to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (IsOpenPopup || IsOpenPopup2 || IsOpenPopup3) &&
        !event.target.closest('.modal-1') && !event.target.closest('.modal-2') && !event.target.closest('.modal-3')
      ) {

        // Check if the click is outside any of the open modals
        setIsOpenPopup(false);
        setIsOpenPopup2(false);
        setIsOpenPopup3(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [IsOpenPopup], [IsOpenPopup2], [IsOpenPopup3]);
  //Form Values Handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to get the quantity of the product in the cart if it exists
  const getCartQuantity = () => {
    console.log('Cart: ', Cart);
    if (all_products[PackageNumber]) {
      const productInCart = Cart.find((item) => item.name === all_products[PackageNumber - 1].name);
      return productInCart ? productInCart.quantity : quantity;
    }
    return quantity;
  };

  // Function to add a product to the cart
  const AddToCart = () => {
    // Identify the product based on the PackageNumber
    const selectedProduct = all_products.find((product, index) => index + 1 === parseInt(PackageNumber));

    if (selectedProduct) {
      // Create a copy of the existing cart
      const updatedCart = [...Cart];

      // Find the index of the selected product in the cart
      const productIndex = updatedCart.findIndex((item) => item.name === selectedProduct.name);

      if (productIndex !== -1) {
        // If the product is already in the cart, update its quantity
        updatedCart[productIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        updatedCart.push({ ...selectedProduct, quantity });
      }

      // Set the Cart state with the updated cart
      setCart(updatedCart);
      function_(updatedCart);

      // Close the older modal and open new one
      setIsOpenPopup(false);
      setIsOpenPopup2(true);

    }
  };

  //Show Popup when button is clicked
  const handleClick = (e) => {
    console.log('Clicked');
    setPackageNumber(e.target.id);
    console.log(e.target.id);
    setIsOpenPopup(true);
  };

  //Set Total Price for checkout page
  const getprice = (e) => {
    console.log(all_products[PackageNumber - 1]);
    if (all_products[PackageNumber - 1]) {
      const total_price = parseInt(all_products[PackageNumber - 1].price.slice(0, -1)) * getCartQuantity().toString();
      console.log(total_price);
      setprice(total_price);
      showCheckout(true);
    }
  };

  //Close Modal1
  const handleModalClose = () => {
    setquantity(1);
    setIsOpenPopup(false);
  };
  //Close Modal2
  const handleModalClose2 = () => {
    setquantity(1);
    setIsOpenPopup2(false);
  };
  //Close Modal3
  const handleModalClose3 = () => {
    setIsOpenPopup3(false);
  };
  return (
    <>
      {/* Product View Screen */}
      <Modal
        className="modal-1"
        overlayClassName="modal-overlay"
        isOpen={IsOpenPopup}
        //style={customStyles}
        onRequestClose={handleModalClose}>
        <FaTimes size={25} onClick={handleModalClose} className='cross-icon' />
        <div className="modal-main">
          <h2 className="text-4xl font-bold">{PackageNumber === '1' ? 'Premium SEO' : PackageNumber === '2' ? 'Enterprise SEO' : 'Custom SEO'}</h2>
          <h5 className="text-sm  pt-2">
            {PackageNumber === '1' ? 'Get the basics to start organizing your inventory today' : PackageNumber === 'Get the basics to start organizing your inventory today' ? 'Enterprise SEO' : 'Extensive website audit and competitor analysis'}

          </h5>
          <h1 className="text-xl pt-5">
            <b className="font-bold text-5xl text-primary-100 ">
              {PackageNumber === '1' ? '$650' : PackageNumber === '2' ? '$2000' : '$3400'}
            </b>
            /Per Consultation
          </h1>
          <div className="number-of-times">
            <p>Number of Consultations</p>
            <div className="quantity">
              <div onClick={() => setquantity(quantity + 1)} className="sub-btn">+</div>
              <div className="sub-btn">{quantity}</div>
              <div onClick={() => { if (quantity > 1) setquantity(quantity - 1); }} className="sub-btn">-</div>

            </div>

          </div>
          <div className="btn-div">
            <button onClick={AddToCart} id="btn-1" className="btn">Add to Cart</button>
            <button onClick={(e) => getprice(e)}  id="btn-2" className="btn">
              <Link to="/Checkout">
                Buy Now
              </Link>
            </button>
          </div>
        </div>
      </Modal>

      {/* Checkout Screen */}
      <Modal
        className="modal-2"
        overlayClassName="modal-overlay-2"
        isOpen={IsOpenPopup2}
        onRequestClose={handleModalClose2}>
        <FaTimes size={25} onClick={handleModalClose2} className='cross-icon' />
        <div className="modal-main">
          <div className="tick-container">
            <div class="success-checkmark"></div>
          </div>
          <h2 className="text-4xl font-bold">Added to Cart</h2>
          <p>Item has been added to your shopping cart</p>
          <div className="list-container">
            <ul className="description">
              <li>
                <span className="label">Product:</span>
                {all_products[PackageNumber - 1] ? all_products[PackageNumber - 1].name : ''}
              </li>
              <li>
                <span className="label">Price per Item:</span>
                {all_products[PackageNumber - 1] ? all_products[PackageNumber - 1].price : ''}
              </li>
              <li>
                <span className="label">Quantity:</span>
                {getCartQuantity()}
              </li>
              <li>
                <span className="label">Total Price:</span>
                {all_products[PackageNumber - 1] ? parseInt(all_products[PackageNumber - 1].price.slice(0, -1)) * getCartQuantity().toString() + "$" : ''}
              </li>
            </ul>
          </div>
          <div className="btn-div">
            {/* <button onClick={AddToCart} id="btn-1" className="btn">Go to cart</button> */}
            <button onClick={(e) => getprice(e)} id="btn-2" className="btn">
              <Link to="/Checkout">
                Buy Now
              </Link>
            </button>
          </div>
        </div>
      </Modal>

      {/* Shipping Screen */}
      <Modal
        className="modal-3"
        overlayClassName="modal-overlay3"
        isOpen={IsOpenPopup3}
        //style={customStyles}
        onRequestClose={handleModalClose3}>
        <FaTimes size={25} onClick={handleModalClose3} className='cross-icon' />
        <div className="modal-main">
          <div className="upper-div">
            <FcShipped size={30} className="shipping-icon" />
            Shipping
          </div>
          <form action="">
            <div className="full">
              <label htmlFor="Name">Name:</label>
              <br></br>
              <input
                className="half"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                className="half"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />

            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <br></br>
              <input
                className="full"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <br></br>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <br></br>
              <input
                className="full padding-below"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="half padding-below"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                className="half padding-below"
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                className="full padding-below"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                {/* Add more countries as needed */}
              </select>
              <br></br>
            </div>
            <div>
              <label htmlFor="deliveryNote">Delivery Note:</label>
              <br></br>
              <textarea
                className="full"
                id="deliveryNote"
                name="deliveryNote"
                placeholder="Notes"
                value={formData.deliveryNote}
                onChange={handleChange}
              />
            </div>
            <div className="last-div"><input className="checkbox" type="checkbox"></input>By Checking this box, I acknowledge and accept the&nbsp; <span style={{ color: 'blue' }}> Terms of Service</span></div>
          </form>
          <div className="btn-div">
            <button onClick={AddToCart} id="btn-1" className="btn">Back</button>
            <button id="btn-2" className="btn">Continue to payment</button>
          </div>
        </div>
      </Modal>


      <div className="container my-12 md:ms-12 all-packages">
        <div className="text-center ">
          <h4 className="text-3xl py-3 font-bold text-gray-600 md:pt-10">
            CHOOSE YOUR PLAN
          </h4>
          <p className="text-lg py-3 text-gray-500">
            We have experience working with large and small businesses and{" "}
            <br />
            are ready to develop a targeted strategy and plan that’s just right
            for you.
          </p>
        </div>
        <div className="row flex justify-center items-center  flex-col md:flex-row ">
          <div className="col-md-4 mx-2 pricing-tableFirst hover:scale-105 transition-all">
            <div className="pricing-table  border-2  purple bg-secondary-100">
              <h2 className="text-4xl font-bold">Premium SEO</h2>
              <h5 className="text-sm  pt-2">
                Get the basics to start organizing your inventory today
              </h5>
              <h1 className="text-xl pt-5">
                <b className="font-bold text-5xl text-primary-100 ">$650</b>
                /Per Consultation
              </h1>
              {/* <h5 className="py-2">(1 Free Month if Paid Annually)</h5> */}
              {/* <div className="my-9 px-1 w-full md:w-1/2 lg:my-8 lg:px-4 lg:w-1/2"> */}
              <div id="1" onClick={(e) => handleClick(e)} className="my-2 start-buttons whitespace-nowrap inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-xl font-medium text-grey bg-primary-100 hover:bg-[#00CCB3]">
                Start Now
              </div>
              {/* </div> */}
              <div className="pricing-features text-2xl ">
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Comprehensive website audit and analysis
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Keyword research and optimization for 20 keywords
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  On-page optimization, and content optimization
                  {/* 
                  including meta
                  tags, headings, */}
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  High-quality backlink building (30 backlinks)
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Quarterly performance reports and analytics tracking
                </div>{" "}
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Social media integration and optimization
                </div>{" "}
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Dedicated account manager and ongoing consultation
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mx-2 hover:scale-105 transition-all">
            <div className="pricing-table border-2 purple bg-secondary-100">
              <h2 className="text-4xl font-bold">Enterprise SEO</h2>
              <h5 className="text-sm  pt-2">
                Grow Faster by adding more users to help you run your business
              </h5>
              <h1 className="text-xl pt-5">
                <b className="font-bold text-5xl text-primary-100 ">$2000</b>
                /Per Consultation
              </h1>
              {/* <h5 className="py-2">(1 Free Month if Paid Annually)</h5> */}
              {/* <div className="my-9 px-1 w-full md:w-1/2 lg:my-8 lg:px-4 lg:w-1/2"> */}

              <div id="2" onClick={(e) => handleClick(e)} className="start-buttons my-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-xl font-medium text-grey bg-primary-100 hover:bg-[#00CCB3] ">
                Start Now
              </div>
              {/* </div> */}
              <div className="pricing-features text-2xl ">
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Extensive website audit and competitor analysis
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Keyword research and optimization up to 50 keywords
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Advanced on-page optimization, including schema markup
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  High-authority backlink building (50 backlinks)
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Monthly performance reports with competitor comparison
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Social media management and content creation (5 posts/week)
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#0290F7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Bi-weekly strategy meetings with an SEO expert
                </div>
              </div>
              {/* <div className="price-tag">
                <span className="symbol">$</span>
                <span className="amount">9,500</span>
                <span className="after"></span>
              </div>
              <a className="price-button" href="#">
                Reservar
              </a> */}
            </div>
          </div>
          <div className="col-md-4 mx-2 hover:scale-105 transition-all">
            <div className="pricing-table border-2 Recommended  purple ">
              <h2 className="text-4xl font-bold"> Custom SEO</h2>
              <h5 className="text-sm  pt-2">
                Extensive website audit and competitor analysis
              </h5>
              <div className="">
                <h1 className="text-xl pt-5">
                  <b className="font-bold text-5xl text-primary-100 ">$3400</b>
                  /Per Consultation
                </h1>
                {/* <h5 className="py-2">(1 Free Month if Paid Annually)</h5> */}
                <div id="3" onClick={(e) => handleClick(e)} className="start-buttons my-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-3  rounded-md shadow-sm text-xl font-medium text-white bg-primary-100 hover:bg-[#00CCB3] hover:scale-105 transition-all">
                  Start Now
                </div>
              </div>
              <div className="pricing-features text-2xl ">
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#00CCB3"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Tailored SEO strategy on your unique business
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#00CCB3"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Thorough website audit, competitor analysis
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#00CCB3"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Keyword research and optimization for keywords
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#00CCB3"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  On-page optimization, content creation, A/B testing
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#00CCB3"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  High-quality, personalized backlink building strategy
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#00CCB3"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Detailed quarterly reports with conversion tracking
                </div>
                <div className="feature flex items-center  ">
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.2605L6.75 12.0105L16.5 2.0105"
                      stroke="#00CCB3"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  24/7 access to a dedicated SEO team for support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricePackages;
