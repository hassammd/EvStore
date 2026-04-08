import hero_left from "../assets/images/hero-left.png";
import Navbar from "./Navbar";

const Hero = ({ data }) => {
  console.log("this is hero dat", data);
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
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-[70px] md:pb-[90px] lg:pb-[100px]">
        <Navbar />
        <div className="container mx-auto px-4 py-[100px]">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-2 items-center">
            <div className="w-1/2 flex flex-col gap-5 items-center md:items-start">
              <span className="text-blue-500 text-lg">{subHeading}</span>
              <h1 className="font-bold">{mainHeading}</h1>
              <p className="text-center md:text-left">{description}</p>
              <button className=" lg:block uppercase bg-orange text-white py-3 px-10 rounded-sm cursor-pointer">
                Shop Now
              </button>
            </div>
            <div className="w-1/2 flex text-center">
              <img className=" w-full" src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
