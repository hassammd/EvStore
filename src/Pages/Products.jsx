import { useDispatch, useSelector } from "react-redux";
import Hero from "../Components/Hero";
import ProductsCard from "../Components/ProductsCard";
import Shimmer from "../Components/Shimmer";
import { heroData } from "../heroData";
import { useEffect, useState } from "react";
import { fetchproducts } from "../Redux/ProductSlice/ProductSlice";
import { fetchCategory } from "../Redux/CategorySlice/CategorySlice";
import { HiViewGrid } from "react-icons/hi";
import { MdViewList } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { addToCart } from "../Redux/CartSlice/CartSlice";
import { FiShoppingCart } from "react-icons/fi";
import { FaAngleDown, FaBagShopping } from "react-icons/fa6";

const Products = () => {
  const [searchedProduct, setSearchedProduct] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [sortOrder, setSortOrder] = useState("az");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPriceRange, setMaxPriceRange] = useState(2000);
  const [isActiveFilterBar, setIsActiveFilterBar] = useState(false);
  const { products, loading } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.categories);

  const data = useSelector((state) => state);
  const { isDark } = useSelector((state) => state.theme);
  const productssss = useSelector((state) => state.products.products);

  console.log("this is products", productssss);

  const dispatch = useDispatch();

  //filter
  const filteredProducts = products.filter((items) => {
    const matchSearch = items.title
      .toLowerCase()
      .includes(searchedProduct.toLowerCase());
    const matchCategory =
      selectedCategory == "" ||
      items.category.toLowerCase() == selectedCategory.toLowerCase();
    const priceRange = items.price <= maxPriceRange;

    return matchSearch && matchCategory && priceRange;
  });

  //product sorting

  const productSort = [...filteredProducts].sort((a, b) => {
    if (sortOrder == "az") {
      return a.price - b.price;
    } else if (sortOrder == "za") {
      return b.price - a.price;
    } else {
      0;
    }
  });

  useEffect(() => {
    dispatch(fetchproducts());
  }, []);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  return (
    <>
      <Hero data={heroData.products} />

      <div className="lg:py-[100px] md:py-[90px] sm:py-[70px] py-[50px] ">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl text-center lg:mb-20 md:mb-15 sm:mb-15 mb-10   tracking-tight">
            Explore Categories
          </h2>

          <div className="flex  gap-7">
            <div
              onClick={() => setIsActiveFilterBar(false)}
              className={`fixed inset-0 bg-black/50 z-10 ${
                isActiveFilterBar ? "block" : "hidden"
              }`}
            ></div>
            {/* filter bar */}

            <div
              className={`${isActiveFilterBar ? " left-0 " : " -left-full"} rounded-sm  lg:left-0 z-30 transition-all duration-300 fixed w-[90%]  h-full  lg:sticky top-0  g:h-[calc(100vh-80px)] overflow-auto flex flex-col gap-8 ${isDark ? "bg-base-200" : "bg-gray"}  lg:w-[20%] lg:p-10 p-5 `}
            >
              <p className={`mb-4 text-center ${isDark ? "text-gray" : ""}`}>
                Filter
              </p>
              <div>
                <label className="input">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    onChange={(e) => setSearchedProduct(e.target.value)}
                    type="search"
                    required
                    placeholder="Search"
                    className="outline-none  "
                  />
                </label>
              </div>
              <div>
                <p className={`mb-4  ${isDark ? "text-gray" : ""} `}>
                  Category
                </p>
                <ul className="flex flex-col gap-2">
                  <li
                    className={`cursor-pointer ${selectedCategory == "" ? "text-orange font-semibold" : ""}`}
                    onClick={() => setSelectedCategory("")}
                  >
                    All
                  </li>
                  {category
                    ? category.map((items) => {
                        return (
                          <li
                            className={`text-sm ${selectedCategory == items.name ? "text-orange font-semibold" : ""} cursor-pointer`}
                            onClick={() => {
                              (setIsActiveFilterBar(false),
                                setSelectedCategory(items.name));
                            }}
                          >
                            {items.name}
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
              <div className="flex gap-3">
                <input
                  onChange={(e) => setMaxPriceRange(e.target.value)}
                  type="range"
                  max={2000}
                  value={maxPriceRange}
                  className="range text-blue-300 [--range-bg:orange] [--range-thumb:blue] [--range-fill:0]"
                />
                <span>${maxPriceRange}</span>
              </div>
            </div>
            {/* products */}
            <div className="lg:w-full flex justify-start flex-col flex-wrap gap-[30px]">
              <div>
                <div className="flex justify-between w-full">
                  {/* hamburger icons */}
                  <div className="flex gap-3.5 justify-between ">
                    {/* hamburger icons */}
                    <span
                      onClick={() => setIsActiveFilterBar(true)}
                      className={`lg:hidden flex items-center justify-center text-center  border border-gray-200 ${isDark ? "bg-base-200" : "bg-gray-50"}  w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm`}
                    >
                      <GiHamburgerMenu />
                    </span>
                    <span
                      onClick={() => setIsGridView(true)}
                      className={`flex items-center justify-center text-center  border border-gray-200 ${isDark ? "bg-base-200" : "bg-gray-50"}   w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm`}
                    >
                      <HiViewGrid className="lg:text-2xl cursor-pointer" />
                    </span>
                    <span
                      onClick={() => setIsGridView(false)}
                      className={`flex items-center justify-center text-center  border border-gray-200 ${isDark ? "bg-base-200" : "bg-gray-50"}  w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm`}
                    >
                      <MdViewList className="lg:text-3xl cursor-pointer" />
                    </span>
                  </div>
                  <div className=" dropdown relative">
                    <select
                      className={`appearance-none border rounded-sm border-gray-200 ${isDark ? "bg-base-200" : "bg-gray-50"} px-6 pr-8 py-2 lg:px-10 lg:py-3`}
                      name=""
                      value={sortOrder}
                      id=""
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option className="" value="az">
                        A to Z
                      </option>
                      <option value="za">Z to A</option>
                    </select>
                    <span className="absolute right-2 top-3 lg:right-2 lg:top-4">
                      <FaAngleDown />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${isGridView ? "w-full flex  flex-wrap gap-7" : "flex flex-col gap-7"}`}
              >
                {loading ? (
                  [...Array(9)].map((items) => {
                    return <Shimmer />;
                  })
                ) : productSort.length > 0 ? (
                  productSort.map((products, index) => {
                    return (
                      <>
                        <div
                          className={` group relative flex flex-col items-center justify-center gap-4 p-4 transition-all duration-300 border  ${isDark ? "border-base-200" : "border-gray-200"}  rounded-lg ${isDark ? "bg-base-200" : "bg-gray-50"} w-full sm:w-[45%] xl:w-[22.9%] md:w-[30%] ${isGridView ? "lg:w-[30.8%]" : "lg:w-full"}  lg:p-8 cursor-pointer hover:shadow-md`}
                        >
                          {/* overlay */}
                          <div className="hidden lg:flex flex-col items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 bg-orange">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(addToCart(products));
                              }}
                              className=" flex items-center justify-center h-[70px] w-[70px] border-white"
                            >
                              <FiShoppingCart className="text-3xl text-white" />
                            </span>
                            <p className="text-gray text-lg">Add to cart</p>
                          </div>
                          <img
                            src={products.thumbnail}
                            alt=""
                            className="object-contain w-20 h-20 lg:w-24 lg:h-24"
                          />
                          <p
                            className={`font-medium text-center ${isDark ? " text-gray" : "text-gray-800"}  text-sm md:text-base`}
                          >
                            {products.title}
                          </p>
                          <p className="text-orange">${products.price}</p>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(addToCart(products));
                            }}
                            className={`lg:hidden absolute bottom-2 right-2 flex items-center justify-center rounded-t-3xl rounded-br-sm rounded-bl-3xl bg-orange h-[40px] w-[40px]`}
                          >
                            <FaBagShopping
                              className={`text-xl ${isDark ? "text-base" : "text-white"} `}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <p>No products found for {searchedProduct}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
