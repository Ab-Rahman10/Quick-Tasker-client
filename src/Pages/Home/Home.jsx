import React from "react";
import WhyQuickTasker from "./WhyQuickTasker/WhyQuickTasker";
import ServicesSection from "./ServicesSection/ServicesSection";
import TaskProgress from "./TaskProgress/TaskProgress";
import Banner from "./Banner/Banner";
import BestWorkers from "./BestWorkers/BestWorkers";
import Testimonials from "./Testimonials/Testimonials";
import FAQ from "./FAQ/FAQ";
import TaskReminder from "./TaskReminder/TaskReminder";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <BestWorkers></BestWorkers>
      <ServicesSection></ServicesSection>
      <WhyQuickTasker></WhyQuickTasker>
      <TaskProgress></TaskProgress>
      <TaskReminder></TaskReminder>
      <FAQ></FAQ>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
