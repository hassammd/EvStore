import { useState } from "react";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import { heroData } from "../heroData";

const About = () => {
  return (
    <>
      <Hero data={heroData.about} />

      {/* footer */}
      <Footer />
    </>
  );
};
export default About;
