import { heroData } from "../heroData";
import { FiShoppingCart } from "react-icons/fi";
import Hero from "../Components/Hero";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCat } from "../Redux/ProductByCatSlice/ProductsByCatSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../Redux/CartSlice/CartSlice";
import { FaBagShopping } from "react-icons/fa6";
const ProductsByCategory = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);
  const { products } = useSelector((state) => state.productsByCat);
  const [isGridView, setIsGridView] = useState(true);
  const [priceRange, setPriceRange] = useState(200);
  const [productSort, setProductSort] = useState("az");
  const [isActiveFilterBar, setIsActiveFilterBar] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState("");
  const { productName } = useParams();

  //dispatch
  useEffect(() => {
    dispatch(fetchProductsByCat(productName));
  }, []);

  //filter product
  const filteredProducts = products.filter((product) => {
    const searchProducts = product.title
      .toLowerCase()
      .includes(searchedProducts.toLocaleLowerCase());
    const price_Range = product.price <= priceRange;

    return searchProducts && price_Range;
  });

  //product sorting
  const sortProducts = [...filteredProducts].sort((a, b) => {
    if (productSort == "az") {
      return a.price - b.price;
    } else if (productSort == "za") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <>
      <Hero data={heroData.products} />
      <div className="lg:py-[100px] md:py-[90px] sm:py-[70px] py-[50px] ">
        <div className="container mx-auto px-4">
          <h2
            class={`capitalize  text-xl md:text-3xl text-center lg:mb-20 md:mb-15 sm:mb-15 mb-10 ${isDark ? "text-base" : "text-gray-900"}  tracking-tight`}
          >
            Explore {productName} Products
          </h2>

          <div className={` flex gap-7 justify-between`}>
            {/* black overlay */}
            <div
              onClick={() => {
                setIsActiveFilterBar(false);
              }}
              className={`${isActiveFilterBar ? "fixed inset-0 bg-black/50 z-10 block lg:hidden" : "hidden "}  `}
            ></div>
            {/* left side */}
            <div
              className={`
  /* Mobile: Fixed Drawer Logic */
  fixed top-0 z-30 h-screen w-[85%] 
  transition-all duration-300 ease-in-out
  
  /* Animation Logic   */
  ${isActiveFilterBar ? "left-0 opacity-100" : "-left-full lg:left-0 opacity-0 lg:opacity-100"} 

  /* Desktop: Sticky Sidebar Logic */
  lg:sticky lg:top-[80px] lg:block lg:w-[20%] lg:h-[calc(100vh-80px)]
  
  /* Styling & Scroll */
  overflow-y-auto shadow-xl lg:shadow-none
  ${isDark ? "bg-base-200 text-white" : "bg-gray-100 text-black"} 
  lg:p-10 p-5 rounded-sm
`}
            >
              <p>Filter</p>
              <div className="flex flex-col gap-15">
                {/* Search products */}
                <label className="input">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    onChange={(e) => setSearchedProducts(e.target.value)}
                    type="search"
                    required
                    placeholder="Search"
                  />
                </label>
                {/* search products */}
                {/* Price Range */}
                <div>
                  <p className={`${isDark ? "text-gray" : " "} `}>Price</p>
                  <div className="flex items-center gap-3">
                    <input
                      onChange={(e) => setPriceRange(e.target.value)}
                      type="range"
                      min={10}
                      max="500"
                      value={priceRange}
                      className="range text-blue-300 [--range-bg:orange] [--range-thumb:blue] [--range-fill:0] "
                    />
                    <p className={`${isDark ? "text-gray" : " "} `}>
                      ${priceRange}
                    </p>
                  </div>
                </div>
                {/* Price Range */}
              </div>
            </div>

            {/* right side */}
            <div className=" lg:w-[80%] flex flex-col flex-wrap gap-7">
              <div className="flex justify-between">
                {/* grid view */}
                <div class="flex gap-3.5 justify-between">
                  <span
                    onClick={() => setIsActiveFilterBar(true)}
                    class={`lg:hidden flex items-center justify-center text-center  border  ${isDark ? "bg-base-200 border-base-300" : "bg-gray-50 border-gray-200"}    w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm`}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
                    </svg>
                  </span>
                  <span
                    onClick={() => setIsGridView(true)}
                    className={`flex items-center justify-center text-center  border  ${isDark ? "bg-base-200 border-base-300" : "bg-gray-50 border-gray-200"}  w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm`}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      class="lg:text-2xl cursor-pointer"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                  </span>
                  <span
                    onClick={() => setIsGridView(false)}
                    class={`flex items-center justify-center text-center rounded-sm border  ${isDark ? "bg-base-200 border-base-300" : "bg-gray-50 border-gray-200"}  w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm"`}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      class="lg:text-3xl cursor-pointer"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z"></path>
                    </svg>
                  </span>
                </div>
                {/* grid view */}
                <div class=" dropdown">
                  <select
                    onChange={(e) => setProductSort(e.target.value)}
                    class={` border  ${isDark ? "bg-base-200 border-base-200" : "bg-gray-50 border-gray-200"} lg:px-5 lg:py-3`}
                    name=""
                    id=""
                  >
                    <option class="" value="az">
                      A to Z
                    </option>
                    <option value="za">Z to A</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex  flex-wrap gap-7">
                {sortProducts.map((items) => {
                  return (
                    <>
                      <div
                        className={` flex ${isGridView ? "lg:w-[23%]" : "lg:w-full"} group relative flex-col items-center justify-center gap-4 p-4 transition-all duration-300 border  rounded-lg ${isDark ? "bg-base-200 border-base-200" : "bg-gray-50 border-gray-200"}  w-full sm:w-[45%] md:w-[30%]  lg:p-8 cursor-pointer hover:shadow-md`}
                      >
                        <div className="hidden lg:flex flex-col items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 bg-orange">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(addToCart(items));
                            }}
                            className=" flex items-center justify-center h-[70px] w-[70px] border-white"
                          >
                            <FiShoppingCart className="text-3xl text-white" />
                          </span>
                          <p className="text-gray text-lg">Add to cart</p>
                        </div>
                        <img
                          className="object-contain w-20 h-20 lg:w-24 lg:h-24"
                          src={items.thumbnail}
                          alt=""
                        />
                        <p
                          className={`${isDark ? "text-gray" : " "} text-center`}
                        >
                          {items.title}
                        </p>
                        <p className="text-center text-orange">
                          ${items.price}
                        </p>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(items));
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
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsByCategory;
