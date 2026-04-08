import Hero from "../Components/Hero";
import { heroData } from "../heroData";

const Cart = () => {
  return (
    <>
      <Hero data={heroData.cart} />
    </>
  );
};
export default Cart;
