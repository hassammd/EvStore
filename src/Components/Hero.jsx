import { useSelector } from "react-redux";
import hero_left from "../assets/images/hero-left.png";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Hero = ({ data }) => {
  const { isDark } = useSelector((state) => state.theme);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  }, []);

  const {
    subHeading,
    mainHeading,
    description,
    primaryBtn,
    secondaryBtn,
    image,
  } = data;
  return (
    <>
      <div
        className={`${isDark ? "bg-base-300" : "bg-gradient-to-r from-blue-50 to-cyan-50"}  md:pb-[90px] lg:pb-[100px]`}
      >
        <Navbar />
        <div className="container mx-auto px-4 py-[100px]">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-2 items-center">
            <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col gap-5 items-center md:items-start">
              <span className="text-blue-500 text-lg">{subHeading}</span>
              <h1 className="font-bold md:text-left text-center">
                {mainHeading}
              </h1>
              <p
                className={` ${isDark ? "text-gray" : ""} text-center md:text-left`}
              >
                {description}
              </p>
              <button className=" hover:-translate-y-1 transition duration-300 lg:block uppercase bg-orange   py-3 px-10 rounded-sm cursor-pointer">
                Shop Now
              </button>
            </div>
            <div className="lg:w-1/2 md:w-1/2  flex text-center">
              <img
                className="w-full animate-float  duration-300"
                src={image}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
