const Shimmer = () => {
  return (
    <>
      <div className="skeleton  flex flex-col items-left justify-center gap-4 p-4 transition-all duration-300 border border-gray-100 rounded-lg bg-transparent  w-full sm:w-[45%] md:w-[30%] lg:w-1/4 lg:p-8 cursor-pointer hover:shadow-md">
        <div class="skeleton bg-gray-100 h-32 w-full "></div>
        <div className=" skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="object-contain w-20 h-20 lg:w-24 lg:h-24  "></div>
        <p className="font-medium text-center text-gray-800 text-sm md:text-base"></p>
      </div>
    </>
  );
};
export default Shimmer;
