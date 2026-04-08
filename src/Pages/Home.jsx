import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Services from "../Components/Services";
import Trusted from "../Components/Trusted";
import { heroData } from "../heroData";

const Home = () => {
  return (
    <>
      <Hero data={heroData.home} />
      <Services />
      <Trusted />
      <Footer />
    </>
  );
};
export default Home;
