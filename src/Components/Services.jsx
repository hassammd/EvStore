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
      <div className=" lg:py-[100px] md:py-[90px] sm:py-[70px] py-[50px]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center flex-wrap gap-4">
            {service.map((items) => {
              return (
                <>
                  <div className="lg:w-1/3 w-full md:w-1/3 rounded-sm bg-gray flex flex-col gap-3 text-center items-center justify-center py-[40px] px-[30px]">
                    <span className="flex items-center justify-center rounded-full bg-white h-12 w-12 text-orange text-3xl">
                      {items.icon}
                    </span>
                    <p>{items.content}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
