import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProductsCard = ({ data }) => {
  const { isDark } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/category/${data.slug}`)}
        className={`group relative flex flex-col items-center justify-center gap-4 p-4 transition-all duration-300 border rounded-lg ${isDark ? "bg-base-200 border-base-200 " : "bg-gray-50 border-gray-200 "} w-full sm:w-[45%] md:w-[30%] lg:w-1/4 lg:p-8 cursor-pointer hover:shadow-md`}
      >
        <img
          src={data.image}
          alt=""
          className="object-contain w-20 h-20 lg:w-24 lg:h-24"
        />
        <p
          className={`font-medium text-center ${isDark ? "text-gray" : "text-gray-800"}  text-sm md:text-base`}
        >
          {data.name}
        </p>
      </div>
    </>
  );
};

export default ProductsCard;
