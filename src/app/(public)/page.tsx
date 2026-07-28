import React from "react";
import { HeroSection } from "./_sections/Hero";
import { HowItWorksSection } from "./_sections/HowItWorks";

const publicHome = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection/>
    </div>
  );
};

export default publicHome;
