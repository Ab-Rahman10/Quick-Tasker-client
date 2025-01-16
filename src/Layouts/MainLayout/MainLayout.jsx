import { Outlet } from "react-router-dom";
import Navbar from "../../Components/ErrorPage/Shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
