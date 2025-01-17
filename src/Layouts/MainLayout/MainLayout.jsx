import { Outlet } from "react-router-dom";
import Navbar from "../../Components/ErrorPage/Shared/Navbar";
import Footer from "../../Components/ErrorPage/Shared/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className="min-h-[calc(100vh-196px)]">
        <Outlet></Outlet>
      </section>
      <Toaster></Toaster>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
