import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  const faqs = [
    {
      question: "What is QuickTasker?",
      answer:
        "QuickTasker is an intuitive web application designed to simplify task management, enhance team collaboration, and boost productivity with advanced features like task scheduling, analytics, and real-time notifications.",
    },
    {
      question: "How do I create a task?",
      answer:
        "To create a task, simply navigate to the task creation page, fill in the details like title, description, and due date, and click 'Create Task'.",
    },
    {
      question: "Can I collaborate with my team?",
      answer:
        "Yes, QuickTasker allows teams to collaborate seamlessly by assigning tasks to different team members, tracking progress, and communicating in real-time.",
    },
    {
      question: "Does QuickTasker have mobile support?",
      answer:
        "Currently, QuickTasker is optimized for desktop use. However, we are working on a mobile version for a better user experience on the go.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="my-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => toggleAnswer(index)} // Handle click
              data-aos="fade-up" // Apply fade-up animation using AOS
              data-aos-delay={index * 100} // Add delay for staggered effect
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {faq.question}
              </h3>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
