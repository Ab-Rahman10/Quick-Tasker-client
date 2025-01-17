import React from "react";
import WhyQuickTasker from "./WhyQuickTasker/WhyQuickTasker";
import ServicesSection from "./ServicesSection/ServicesSection";
import TaskProgress from "./TaskProgress/TaskProgress";

const Home = () => {
  return (
    <div>
      <WhyQuickTasker></WhyQuickTasker>
      <ServicesSection></ServicesSection>
      <TaskProgress></TaskProgress>
    </div>
  );
};

export default Home;
