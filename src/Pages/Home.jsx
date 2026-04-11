import { useEffect } from "react";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Services from "../Components/Services";
import Trusted from "../Components/Trusted";
import { heroData } from "../heroData";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../Redux/CategorySlice/CategorySlice";
import Shimmer from "../Components/Shimmer";
import ProductsCard from "../Components/ProductsCard";

const Home = () => {
  const dispatch = useDispatch();
  const { category, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  return (
    <>
      <Hero data={heroData.home} />
      <div className="lg:py-[100px] md:py-[90px] sm:py-[70px] py-[50px] ">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl text-center lg:mb-20 md:mb-15 sm:mb-15 mb-10 text-gray-900 tracking-tight">
            Explore Categories
          </h2>

          <div className="flex justify-center flex-wrap gap-[30px]">
            {loading
              ? [...Array(9)].map((items) => {
                  return <Shimmer />;
                })
              : category &&
                category.map((category, index) => {
                  return (
                    <>
                      <ProductsCard data={category} />
                    </>
                  );
                })}
          </div>
        </div>
      </div>

      <Services />
      <Trusted />
      <Footer />
    </>
  );
};
export default Home;
