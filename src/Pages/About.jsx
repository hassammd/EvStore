import Hero from "../Components/Hero";
import { heroData } from "../heroData";

const About = () => {
  return (
    <>
      <Hero data={heroData.about} />
    </>
  );
};
export default About;
