import { TbTruckDelivery } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineHeadsetMic } from "react-icons/md";
const Services = () => {
  const service = [
    {
      content: "Super Fast and Free Delivery",
      icon: <TbTruckDelivery />,
    },
    {
      content: "Money-back Guaranteed",
      icon: <GiReceiveMoney />,
    },
    {
      content: "Super Secure Payment System",
      icon: <RiSecurePaymentLine />,
    },
    {
      content: "24/7 Customer Support",
      icon: <MdOutlineHeadsetMic />,
    },
  ];
  return (
    <>
      <div className=" lg:py-[100px] md:py-[90px] sm:py-[70px] py-[50px] bg-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl text-center lg:mb-20 md:mb-15 sm:mb-15 mb-10 text-gray-900 tracking-tight">
            Why Choose Us
          </h2>
          <div className="flex justify-center items-center flex-wrap gap-4">
            {service.map((items, index) => {
              return (
                // Fragment hata den aur direct div par key lagayen
                <div
                  key={index}
                  className="hover:shadow-md cursor-pointer transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-3 items-center justify-center py-[40px] px-[30px]"
                >
                  <span className="flex items-center justify-center rounded-full bg-white h-12 w-12 text-orange-500 text-3xl">
                    {items.icon}
                  </span>
                  <p>{items.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
