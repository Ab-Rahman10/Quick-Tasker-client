import React from "react";
import WhyQuickTasker from "./WhyQuickTasker/WhyQuickTasker";
import ServicesSection from "./ServicesSection/ServicesSection";
import TaskProgress from "./TaskProgress/TaskProgress";
import Banner from "./Banner/Banner";
import BestWorkers from "./BestWorkers/BestWorkers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <BestWorkers></BestWorkers>
      <ServicesSection></ServicesSection>
      <WhyQuickTasker></WhyQuickTasker>
      <TaskProgress></TaskProgress>
    </div>
  );
};

export default Home;
