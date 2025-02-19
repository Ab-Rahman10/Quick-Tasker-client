import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 w-11/12 lg:w-9/12 mx-auto">
      <div className=" text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold text-green-500 mb-4"
          data-aos="fade-up"
        >
          About QuickTasker
        </h2>
        <p
          className="text-gray-700 text-lg mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          QuickTasker is your go-to platform for finding skilled professionals
          to get your tasks done efficiently. Whether you need freelance work,
          small gigs, or professional services, we connect workers with the
          right clients seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div
          className="bg-white p-6 rounded-lg shadow-lg text-center"
          data-aos="fade-up"
        >
          <h3 className="text-xl font-semibold text-green-500">
            Reliable & Secure
          </h3>
          <p className="text-gray-600 mt-2">
            We ensure a safe and secure environment for both workers and
            clients.
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3 className="text-xl font-semibold text-green-500">
            Fast & Efficient
          </h3>
          <p className="text-gray-600 mt-2">
            Get your tasks completed quickly by experienced professionals.
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h3 className="text-xl font-semibold text-green-500">
            Flexible & Affordable
          </h3>
          <p className="text-gray-600 mt-2">
            Choose from a range of services that fit your budget and needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
