import React from "react";
import { HeroSection } from "./_sections/Hero";
import { HowItWorksSection } from "./_sections/HowItWorks";
import Cta from "./_sections/Cta";
import { ServiceSection } from "./_sections/Service";
import OurMission from "./_sections/OurMission";
const publicHome = () => {
  return (
    <div className="space-y-2">
      <HeroSection />
      <HowItWorksSection />
      <ServiceSection />
      <OurMission/>
      <Cta />
    </div>
  );
};

export default publicHome;
