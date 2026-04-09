const ProductsCard = ({ data }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-4 transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 w-full sm:w-[45%] md:w-[30%] lg:w-1/4 lg:p-8 cursor-pointer hover:shadow-md">
        <img
          src={data.image}
          alt=""
          className="object-contain w-20 h-20 lg:w-24 lg:h-24"
        />
        <p className="font-medium text-center text-gray-800 text-sm md:text-base">
          {data.name}
        </p>
      </div>
    </>
  );
};

export default ProductsCard;
