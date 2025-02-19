import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const ContactInfo = () => {
  const form = useRef();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_tvivg5g", "template_xf7lf48", form.current, {
        publicKey: "Nw_E7BgJTWsHqueqm",
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response);
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send message! Check console for details.");
        }
      );
  };

  return (
    <section className="w-11/12 lg:w-9/12 mx-auto py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Contact Us</h2>
        <p className="text-gray-700 text-lg mb-6">
          Have a question? Reach out to us anytime.
        </p>
      </div>

      {/* Contact Form */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-8/12 mx-auto mt-12"
        data-aos="fade-up"
      >
        <h3 className="text-2xl font-semibold text-green-500 mb-6 text-center">
          Send Us a Message
        </h3>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Message</label>
            <textarea
              name="message"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 h-32 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactInfo;
