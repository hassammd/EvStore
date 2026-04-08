import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray justify-center h-screen w-full flex flex-col gap-4 items-center">
        <span className="text-4xl lg:h-30 lg:w-30 h-20 w-20 bg-green-600 rounded-full flex items-center justify-center">
          <TiTick className="text-white lg:text-[80px] text-[50px]" />
        </span>
        <h1>Thank You</h1>
        <p className="text-center">
          Hi there! Thank you for contacting us.<br></br> We’ve received your
          inquiry and our team is already looking into it.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange lg:py-4 lg:px-5 py-3 px-4 rounded-lg cursor-pointer text-white"
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
};
export default ThankYou;
