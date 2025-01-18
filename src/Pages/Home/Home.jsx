import React from "react";
import WhyQuickTasker from "./WhyQuickTasker/WhyQuickTasker";
import ServicesSection from "./ServicesSection/ServicesSection";
import TaskProgress from "./TaskProgress/TaskProgress";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WhyQuickTasker></WhyQuickTasker>
      <ServicesSection></ServicesSection>
      <TaskProgress></TaskProgress>
    </div>
  );
};

export default Home;
