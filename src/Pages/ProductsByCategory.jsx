import { heroData } from "../heroData";
import Hero from "../Components/Hero";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCat } from "../Redux/ProductByCatSlice/ProductsByCatSlice";
import { useParams } from "react-router-dom";
const ProductsByCategory = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsByCat);
  const [isGridView, setIsGridView] = useState(true);
  const [priceRange, setPriceRange] = useState(200);
  const [productSort, setProductSort] = useState("az");
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
    console.log("this is a", a);
    console.log("this is a", b);
  });

  console.log("sortProducts");
  return (
    <>
      <Hero data={heroData.products} />
      <div className="lg:py-[100px] md:py-[90px] sm:py-[70px] py-[50px] ">
        <div className="container mx-auto px-4">
          <h2 class="capitalize  text-xl md:text-3xl text-center lg:mb-20 md:mb-15 sm:mb-15 mb-10 text-gray-900 tracking-tight">
            Explore {productName} Products
          </h2>
          {/* left side */}
          <div className="flex gap-7 justify-between">
            <div className="bg-gray lg:w-[20%] lg:p-10 p-5">
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
                  <p>Price</p>
                  <div className="flex items-center gap-3">
                    <input
                      onChange={(e) => setPriceRange(e.target.value)}
                      type="range"
                      min={10}
                      max="500"
                      value={priceRange}
                      className="range text-blue-300 [--range-bg:orange] [--range-thumb:blue] [--range-fill:0] "
                    />
                    <p>${priceRange}</p>
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
                    onClick={() => setIsGridView(true)}
                    class="flex items-center justify-center text-center  border border-gray-200 bg-gray-50  w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm"
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
                    class="flex items-center justify-center text-center  border border-gray-200 bg-gray-50  w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-sm"
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
                    class=" border border-gray-200 bg-gray-50 lg:px-5 lg:py-3"
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
                        className={`flex ${isGridView ? "lg:w-[23%] " : "lg:w-full"} flex-col items-center justify-center gap-4 p-4 transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 w-full sm:w-[45%] md:w-[30%]  lg:p-8 cursor-pointer hover:shadow-md`}
                      >
                        <img
                          className="object-contain w-20 h-20 lg:w-24 lg:h-24"
                          src={items.thumbnail}
                          alt=""
                        />
                        <p className="text-center">{items.title}</p>
                        <p className="text-center text-orange">
                          ${items.price}
                        </p>
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
