import { useDispatch, useSelector } from "react-redux";

import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeItem,
} from "../Redux/CartSlice/CartSlice";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import CheckOut from "../Components/CheckOut";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import shippingimg from "../assets/images/shippingimg.png";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const [shipping, setShipping] = useState(10);
  const [promoCode, setPromoCode] = useState("");
  const [isInvalidPromo, setIsInvalidPromo] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);

  //cart count
  const cartCount = cart.reduce((acc, current) => {
    return acc + current.quantity;
  }, 0);

  //subTotal
  const subTotal = cart.reduce((acc, current) => {
    return acc + current.quantity * current.price;
  }, 0);

  //promoCode
  const promoHandler = (e) => {
    if (promoCode === "SAVE10") {
      const discount = subTotal * 0.1;
      setDiscountAmount(discount);
      setIsInvalidPromo(false);
    } else {
      setIsInvalidPromo(true);
      setPromoCode("");
    }
  };

  //total cost
  const totalCost = subTotal + Number(shipping) - discountAmount;

  //form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [house, setHouse] = useState("");
  const [Landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});

  console.log(error);
  const handleForm = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!firstName.trim()) {
      newError.firstName = "Enter your First Name";
    }
    if (!lastName.trim()) {
      newError.lastName = "Enter Your Last Name";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!email.trim()) {
      newError.email = "Enter your Email";
    } else if (!emailRegex.test(email)) {
      newError.RegexEmail = "Enter valid email";
    }
    if (!phone.trim()) {
      newError.phone = "Enter your Number";
    }
    if (!city.trim()) {
      newError.city = "Enter your City";
    }
    if (!house.trim()) {
      newError.house = "Enter your house";
    }
    if (!state.trim()) {
      newError.state = "Enter your state";
    }
    if (!zip.trim()) {
      newError.zip = "Enter zip Code";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      try {
        const orderData = {
          customerDetails: {
            firstName,
            lastName,
            email,
            phone,
            address: {
              city,
              house,
              state,
              zip,
              Landmark: Landmark || "",
            },
            description: description || "",
          },
          items: cart,
          totalAmount: totalCost,
          shippingFee: shipping,
          discount: discountAmount,
          orderStatus: "pending",
          createdAt: new Date(),
        };
        // sav data at firestore
        const docRef = await addDoc(collection(db, "orders"), orderData);
        alert("Order Confirmed! Your Order ID is: " + docRef.id);
        navigate(`/orderSummary/${docRef.id}`);

        dispatch(clearCart());
      } catch (err) {
        console.log("this is order error", err);
        // alert("Kuch masla hua hai, dobara koshish karein.");
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCity("");
      setHouse("");
      setState("");
      setZip("");
      setError({});
    }
  };

  return (
    <>
      {/* <Hero data={heroData.cart} /> */}
      <Navbar />
      <div className="py-[100px]">
        {cart.length > 0 ? (
          <div className="container mx-auto mt-10 lg:p-6 p-4">
            <div
              className={`flex flex-col lg:flex-row shadow-lg bg-white rounded-lg overflow-hidden border ${isDark ? " border-base-100" : " border-gray-100"}`}
            >
              {!isCheckOut ? (
                //Left Side: Product List
                <div
                  className={`w-full lg:w-[70%] ${isDark ? "bg-base-200 text-base " : "bg-white"}  px-6 md:px-10 py-10`}
                >
                  <div className="flex justify-between border-b lg:pb-8 pb-4">
                    <h1
                      className={`font-bold text-[14px] lg:text-2xl ${isDark ? "text-base" : "text-gray-800"} `}
                    >
                      Shopping Cart
                    </h1>
                    <h2
                      className={` ${isDark ? "text-base" : "text-gray-800"} font-semibold text-[14px] lg:text-2xl `}
                    >
                      {cartCount} Items
                    </h2>
                  </div>

                  {/* Table Header */}
                  <div
                    className={`flex mt-10 mb-5 ${isDark ? "text-base" : "text-gray-800"} text-xs uppercase font-bold tracking-wider`}
                  >
                    <h3 className="w-2/5">Product Details</h3>
                    <h3 className="w-1/5 text-center">Quantity</h3>
                    <h3 className="w-1/5 text-center">Price</h3>
                    <h3 className="w-1/5 text-center">Total</h3>
                  </div>

                  {/* Product Rows */}
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex  items-center hover:bg-gray-50 -mx-4 px-4 lg:py-5 py-1 border-b border-gray-100 transition-all"
                    >
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <img
                            className="rounded"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        </div>

                        <div className=" flex flex-col justify-center lg:ml-4 m-2 flex-grow">
                          <span
                            className={`${isDark ? "text-base" : "text-gray-800"} font-bold text-sm`}
                          >
                            {item.title}
                          </span>
                          <span
                            onClick={() => dispatch(removeItem(item.id))}
                            className="  text-red-500 text-xs cursor-pointer hover:underline mt-1 font-medium"
                          >
                            Remove
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 justify-center w-1/5">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className={`lg:w-8 lg:h-8 w-8 h-5 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-200 ${isDark ? "border-gray text-base" : "text-gray-800"} text-lg`}
                        >
                          -
                        </button>
                        <span
                          className={`${isDark ? "border-gray text-base" : "text-gray-800"}  font-semibol`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQty(item.id))}
                          className={`cursor-pointer lg:w-8 lg:h-8 w-8 h-5 flex items-center justify-center border rounded-md hover:bg-gray-200 ${isDark ? "border-gray text-base" : "text-gray-800"} text-lg`}
                        >
                          +
                        </button>
                      </div>

                      <span
                        className={`text-center w-1/5 font-semibold text-sm ${isDark ? "text-base" : "text-gray-800"}`}
                      >
                        ${item.price}
                      </span>
                      <span
                        className={`text-center w-1/5 font-bold text-sm ${isDark ? "text-base" : "text-gray-800"}`}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <button
                    onClick={() => navigate("/")}
                    className="cursor-pointer inline-flex items-center font-semibold text-[#FF7420] text-sm mt-10 hover:translate-x-[-5px] transition-transform"
                  >
                    <svg
                      className="fill-current mr-2 w-4"
                      viewBox="0 0 448 512"
                    >
                      <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                //left side checkout section
                <CheckOut
                  handleForm={handleForm}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  city={city}
                  setCity={setCity}
                  house={house}
                  Landmark={Landmark}
                  setLandmark={setLandmark}
                  setHouse={setHouse}
                  state={state}
                  setState={setState}
                  zip={zip}
                  setZip={setZip}
                  description={description}
                  setDescription={setDescription}
                  error={error}
                />
              )}

              {/* Right Side: Order Summary */}
              {!isCheckOut ? (
                <div
                  className={`w-full lg:w-[30%] px-8 py-10  border-l ${isDark ? " bg-base-100 text-base border-base-100" : "text-gray-800 bg-gray-50 border-gray-100"} `}
                >
                  <h2
                    className={`${isDark ? " text-base" : "text-gray-800"} font-bold text-2xl border-b pb-8 `}
                  >
                    Order Summary
                  </h2>

                  <div
                    className={`flex justify-between mt-10 mb-5 uppercase text-sm font-bold ${isDark ? "border-gray text-base" : "text-gray-800"}`}
                  >
                    <span>Items ({cartCount})</span>
                    <span>${subTotal.toFixed(2)}</span>
                  </div>

                  <div className="mb-6">
                    <label
                      className={`"font-semibold inline-block mb-3 text-sm uppercase ${isDark ? "border-gray text-base" : "text-gray-800"}`}
                    >
                      Shipping
                    </label>
                    <select
                      onChange={(e) => setShipping(Number(e.target.value))}
                      className="lg:text-sm text-[12px] block p-3 border border-gray-300 text-gray-700 w-full text-sm outline-none rounded bg-white focus:border-orange-400"
                    >
                      <option value="10">Standard shipping - $10.00</option>
                      <option value="25">Express shipping - $25.00</option>
                    </select>
                  </div>

                  <div className="py-4 border-t border-gray-200">
                    <label
                      className={`font-bold inline-block mb-3 text-sm uppercase ${isDark ? "border-gray text-base" : "text-gray-800"}`}
                    >
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        onChange={(e) => setPromoCode(e.target.value)}
                        type="text"
                        placeholder="Enter SAVE10"
                        className={`${isInvalidPromo && "border-red-600"} p-3 lg:text-sm text-[12px] w-full rounded border border-gray-300 outline-none focus:border-orange-400`}
                      />
                      <button
                        onClick={promoHandler}
                        className="bg-gray-800 cursor-pointer text-white px-4 py-2 rounded text-xs font-bold hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="border-t mt-8 pt-8">
                    <div className="flex font-bold justify-between text-lg uppercase text-gray-900">
                      <span
                        className={`${isDark ? "text-base" : "text-gray-800"}`}
                      >
                        Total cost
                      </span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setIsCheckOut(true)}
                      className="bg-orange font-bold cursor-pointer py-4 mt-6 text-sm text-white uppercase w-full rounded shadow-lg transition-all active:scale-[0.98]"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-1/2 flex  items-center justify-center">
                  <img src={shippingimg} alt="" />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className=" h-screen flex flex-col justify-center items-center  ">
            <div
              className={`${isDark ? "bg-base-200" : "bg-white"}  p-10 rounded-2xl   flex flex-col items-center max-w-lg text-center gap-6`}
            >
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
                <span className="text-6xl text-[#FF7420]">
                  <FiShoppingCart />
                </span>
              </div>
              <h1
                className={` text-2xl font-bold ${isDark ? "text-base" : "text-gray-800"} `}
              >
                Your Cart is Empty!
              </h1>
              <p
                className={`${isDark ? "text-base" : "text-gray-800"}  text-sm leading-relaxed`}
              >
                Looks like you haven't added anything to your cart yet. Explore
                our shop and find something you love!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-orange text-white px-10 py-4 rounded-sm cursor-pointer hover:-translate-y-1   transition-all duration-300   active:scale-95"
              >
                Return To Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
