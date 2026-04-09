import { useDispatch, useSelector } from "react-redux";
import Hero from "../Components/Hero";
import ProductsCard from "../Components/ProductsCard";
import Shimmer from "../Components/Shimmer";
import { heroData } from "../heroData";
import { useEffect, useState } from "react";
import { fetchproducts } from "../Redux/ProductSlice/ProductSlice";
import { fetchCategory } from "../Redux/CategorySlice/CategorySlice";

const Products = () => {
  const [searchedProduct, setSearchedProduct] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { products, loading } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.categories);
  const data = useSelector((state) => state);
  console.log("this is All products list", products);

  console.log("this is category", data);

  const dispatch = useDispatch();

  //filter
  const filteredProducts = products.filter((items) => {
    const matchSearch = items.title
      .toLowerCase()
      .includes(searchedProduct.toLowerCase());
    const matchCategory =
      selectedCategory == "" ||
      items.category.toLowerCase() == selectedCategory.toLowerCase();

    return matchSearch && matchCategory;
  });
  console.log("this is items from fitler", filteredProducts);

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
          <h2 className="text-xl md:text-3xl text-center lg:mb-20 md:mb-15 sm:mb-15 mb-10 text-gray-900 tracking-tight">
            Explore Categories
          </h2>
          <p>{selectedCategory}</p>
          <div className="flex gap-7">
            <div className=" h-screen sticky top-0 flex flex-col gap-8 bg-gray lg:w-[20%] p-10">
              <p className="mb-4 text-center">Filter</p>
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
                    className="outline-none"
                  />
                </label>
              </div>
              <div>
                <p className="mb-4">Category</p>
                <ul className="flex flex-col gap-2">
                  {category
                    ? category.map((items) => {
                        return (
                          <li
                            className="text-sm"
                            onClick={() => setSelectedCategory(items.name)}
                          >
                            {items.name}
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
            </div>
            <div className="lg:w-[70%] flex justify-center flex-wrap gap-[30px]">
              {loading ? (
                [...Array(9)].map((items) => {
                  return <Shimmer />;
                })
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((products, index) => {
                  return (
                    <>
                      <div className="flex flex-col items-center justify-center gap-4 p-4 transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 w-full sm:w-[45%] md:w-[30%] lg:w-1/4 lg:p-8 cursor-pointer hover:shadow-md">
                        <img
                          src={products.thumbnail}
                          alt=""
                          className="object-contain w-20 h-20 lg:w-24 lg:h-24"
                        />
                        <p className="font-medium text-center text-gray-800 text-sm md:text-base">
                          {products.title}
                        </p>
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
    </>
  );
};
export default Products;
