import { TbError404 } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray justify-center h-screen w-full flex flex-col gap-4 items-center">
        <TbError404 className="text-[200px]" />
        <p className="text-center">
          The link you followed might be broken, or the product is no longer in
          stock. <br></br>
          Don't worry, we have plenty of other great things to show you!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange lg:py-4 lg:px-5 py-3 px-4 rounded-lg cursor-pointer text-white"
        >
          Back to Homepage
        </button>
      </div>
    </>
  );
};
export default ErrorPage;
