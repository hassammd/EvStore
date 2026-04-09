import { useEffect } from "react";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Services from "../Components/Services";
import Trusted from "../Components/Trusted";
import { heroData } from "../heroData";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../Redux/CategorySlice/CategorySlice";

const Home = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categories);
  console.log("this is data", category);
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
            {category.map((category, index) => {
              return (
                <>
                  <div className="flex flex-col items-center justify-center gap-4 p-4 transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 w-full sm:w-[45%] md:w-[30%] lg:w-1/4 lg:p-8 cursor-pointer hover:shadow-md">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-contain w-20 h-20 lg:w-24 lg:h-24"
                    />
                    <p className="font-medium text-center text-gray-800 text-sm md:text-base">
                      {category.name}
                    </p>
                  </div>
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
