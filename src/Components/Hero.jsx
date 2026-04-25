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
      <div className={`${isDark ? "bg-base-200" : "bg-gray-50"}  `}>
        <Navbar />
        <div className="container mx-auto px-10">
          <div className=" pt-[110px] pb-[80px] flex flex-col-reverse lg:flex-row justify-between gap-8 items-center">
            {/* Text Column: Mobile par Center, Desktop par Left */}
            <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
              <span className="text-orange text-lg font-medium">
                {subHeading}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold  ">
                {mainHeading}
              </h1>

              <p
                className={`max-w-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {description}
              </p>

              <button className="text-white hover:-translate-y-1 transition duration-300 uppercase bg-orange py-3 px-10 rounded-full cursor-pointer shadow-lg">
                Shop Now
              </button>
            </div>

            {/* Image Column: Mobile par Image pehle dikhayega (reverse logic ki wajah se) */}
            <div className="lg:w-1/2 w-full flex justify-center items-center">
              <img
                className="w-[90%] md:w-[70%] lg:w-auto  drop-shadow-xl"
                src={image}
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
