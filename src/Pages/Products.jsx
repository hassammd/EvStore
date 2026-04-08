import Hero from "../Components/Hero";
import { heroData } from "../heroData";

const Products = () => {
  return (
    <>
      <Hero data={heroData.products} />
    </>
  );
};
export default Products;
