import { useSelector } from "react-redux";

const Trusted = () => {
  const { isDark } = useSelector((state) => state.theme);
  const trustedBrands = [
    {
      id: 1,
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      name: "Google",
    },
    {
      id: 2,
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      name: "IBM",
    },
    {
      id: 3,
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      name: "Microsoft",
    },
    {
      id: 4,
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      name: "Amazon",
    },
    {
      id: 5,
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      name: "Netflix",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <>
      <div className="  lg:py-[100px] md:py-[90px] sm:py-[70px] py-[50px]">
        <div className="container mx-auto px-4">
          <h2
            className={`text-xl md:text-3xl text-center lg:mb-20 md:mb-15 sm:mb-15 mb-10 ${isDark ? "text-gray" : "text-gray-900"}  tracking-tight`}
          >
            Our Premium Partners
          </h2>

          <div className="flex items-center flex-wrap justify-around">
            {trustedBrands.map((items) => {
              return (
                <div key={items.id}>
                  <img
                    className="lg:w-[130px] lg:h-[70px] w-[50px] aspect-video object-contain grayscale contrast-400 hover:filter-none transition duration-500 ease-in-out cursor-pointer"
                    src={items.logo}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Trusted;
