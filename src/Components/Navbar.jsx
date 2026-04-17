import { GrCart } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Theme from "./Theme";
import { IoMdLogIn } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark } = useSelector((state) => state.theme);

  useEffect(() => {
    const scrollHanler = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollHanler);
    return () => window.removeEventListener("scroll", scrollHanler);
  }, []);

  const { cart } = useSelector((state) => state.cart);

  const quantityCount = cart.reduce((acc, current) => {
    return current.quantity + acc;
  }, 0);

  const navLinks = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Products",
      url: "/products",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`w-full fixed top-0 z-30 ${isScrolled ? "bg-base-200 shadow-sm" : "bg-transparent"} `}
      >
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-5">
            <div>
              <Link to={"/"}>
                <h2 className="text-[24px] lg:text-[30px]">EvStore</h2>
              </Link>
            </div>

            <div className="hidden lg:block">
              <ul className="flex gap-10">
                {navLinks.map((items) => {
                  return (
                    <li>
                      <NavLink
                        className={(e) =>
                          `${e.isActive ? "border-b-2 border-orange font-semibold transition  text-orange duration-200 ease-in-out p-0.5 }" : ""}   p-0.5 hover:text-orange hover:font-semibold transition duration-300 ease-in-out`
                        }
                        to={items.url}
                      >
                        {items.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className=" flex items-center gap-8 ">
              <div className="flex items-center gap-3">
                <FaRegUser
                  onClick={() => navigate("/auth")}
                  className="lg:text-2xl text-[25px] cursor-pointer hover:text-orange transition-all ease-in-out duration-200"
                />
                <div>
                  <Theme />
                </div>

                <div
                  onClick={() => navigate("/cart")}
                  className="relative cursor-pointer"
                >
                  <PiShoppingCartSimpleBold className="lg:text-2xl text-[25px] hover:text-orange transition-all ease-in-out duration-200" />

                  <span className="absolute top-[-10px] right-[-17px] text-white flex items-center justify-center bg-orange rounded-2xl h-6 w-6">
                    {quantityCount}
                  </span>
                </div>
              </div>
              <div className="lg:hidden flex flex-row gap-2 ">
                <RxHamburgerMenu
                  onClick={() => setIsActive(true)}
                  className={`${isActive ? "hidden" : "block"} lg:text-2xl text-2xl cursor-pointer`}
                />
                <IoCloseSharp
                  onClick={() => setIsActive(false)}
                  className={`${isActive ? "block" : "hidden"} lg:text-2xl text-2xl`}
                />
              </div>
              {/* mobile navigation */}
              <div
                className={`${isActive ? "left-0 opacity-100" : "-left-full opacity-0"} lg:hidden fixed transition-all duration-500 ease-in-out z-10 w-[70%] top-0 h-screen   py-4  flex items-center justify-center ${isDark ? "bg-base-200" : "bg-gray"} `}
              >
                <ul className=" flex flex-col items-center justify-center gap-6">
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
