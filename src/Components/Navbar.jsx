import { GrCart } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full bg-gray">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-5">
            <div>
              <h2>EvStore</h2>
            </div>

            <div className="hidden lg:block">
              <ul className="flex gap-10">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/products"}>Products</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contacts</Link>
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
                  0
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
                className={`${isActive ? "block" : "hidden"} w-1/2 lg:hidden absolute top-16 right-0 py-4  flex items-center justify-center bg-gray`}
              >
                <ul className=" flex flex-col items-center justify-center gap-7">
                  <li>Home</li>
                  <li>About</li>
                  <li>Products</li>
                  <li>Contacts</li>
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
