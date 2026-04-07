import hero_left from "../assets/images/hero-left.png";
const Hero = () => {
  return (
    <>
      <div className="py-[70px] md:py-[90px] lg:py-[100px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row justify-between  gap-2 items-center">
            <div className="flex flex-col gap-5 items-center md:items-start">
              <span className="text-blue-500 text-lg">Welcome to</span>
              <h1 className="font-bold">EV Store</h1>
              <p className="text-center md:text-left">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
                sed unde maiores adipisci dolore. Autem tempora facere ullam,
                exercitationem labore et? Saepe expedita possimus animi alias
                temporibus earum sit. Culpa!
              </p>
              <button className=" lg:block uppercase bg-orange text-white py-3 px-10 rounded-sm cursor-pointer">
                Shop Now
              </button>
            </div>
            <div className="flex text-center">
              <img className=" w-full" src={hero_left} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
