import { GrCart } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  const quantityCount = cart.reduce((acc, current) => {
    return current.quantity + acc;
  }, 0);
  console.log("this is from nav", quantityCount);

  const navigate = useNavigate();
  return (
    <>
      <div className="w-full fixed top-0 z-30 bg-white ">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-5">
            <div>
              <h2>EvStore</h2>
            </div>

            <div className="hidden lg:block">
              <ul className="flex gap-10">
                <li>
                  <NavLink
                    className={(e) =>
                      `${e.isActive ? "border-b-2 border-orange font-semibold transition text-orange duration-200 ease-in-out p-0.5" : ""} p-0.5 hover:text-orange hover:font-semibold transition duration-300 ease-in-out`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(e) =>
                      `${e.isActive ? "border-b-2 border-orange font-semibold transition text-orange duration-200 ease-in-out p-0.5" : ""} p-0.5 hover:text-orange hover:font-semibold transition duration-300 ease-in-out`
                    }
                    to={"/about"}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(e) =>
                      `${e.isActive ? "border-b-2 border-orange font-semibold transition text-orange duration-200 ease-in-out p-0.5" : ""} p-0.5 hover:text-orange hover:font-semibold transition duration-300 ease-in-out`
                    }
                    to={"/products"}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(e) =>
                      `${e.isActive ? "border-b-2 border-orange font-semibold transition text-orange duration-200 p-0.5 ease-in-out" : ""} p-0.5 hover:text-orange hover:font-semibold transition duration-300 ease-in-out`
                    }
                    to={"/contact"}
                  >
                    Contacts
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className=" flex items-center gap-10">
              <button className="hidden lg:block  bg-orange text-white py-3 px-4 rounded-sm cursor-pointer">
                Login
              </button>

              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer"
              >
                <GrCart className="text-2xl" />
                <span className="absolute top-[-10px] right-[-17px] text-white flex items-center justify-center bg-orange rounded-2xl h-6 w-6">
                  {quantityCount}
                </span>
              </div>
              <div className="lg:hidden flex flex-row  ">
                <RxHamburgerMenu
                  onClick={() => setIsActive(true)}
                  className={`${isActive ? "hidden" : "block"} text-3xl cursor-pointer`}
                />
                <IoCloseSharp
                  onClick={() => setIsActive(false)}
                  className={`${isActive ? "block" : "hidden"} text-3xl`}
                />
              </div>
              {/* mobile navigation */}
              <div
                className={`${isActive ? "block" : "hidden"} w-1/2 lg:hidden absolute z-10 top-16 right-0 py-4  flex items-center justify-center bg-gray`}
              >
                <ul className=" flex flex-col items-center justify-center gap-7">
                  <li>
                    <Link to="/" onClick={() => setIsActive(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/about"} onClick={() => setIsActive(false)}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to={"/products"} onClick={() => setIsActive(false)}>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to={"/contact"} onClick={() => setIsActive(false)}>
                      Contacts
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
