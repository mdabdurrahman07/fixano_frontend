import React from "react";
import { HeroSection } from "./_sections/Hero";
import { HowItWorksSection } from "./_sections/HowItWorks";
import Cta from "./_sections/Cta";

const publicHome = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection/>
      <Cta/>
    </div>
  );
};

export default publicHome;
