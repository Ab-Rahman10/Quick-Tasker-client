import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layouts/MainLayout/Dashboard";
import AddNewTask from "../Pages/Dashboard/Buyer/AddNewTask";
import BuyerHome from "../Pages/Dashboard/Buyer/BuyerHome";
import MyTasks from "../Pages/Dashboard/Buyer/MyTasks";
import PurchaseCoin from "../Pages/Dashboard/Buyer/PurchaseCoin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "buyer-home",
        element: <BuyerHome></BuyerHome>,
      },
      {
        path: "add-new-task",
        element: <AddNewTask></AddNewTask>,
      },
      {
        path: "my-tasks",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "purchase-coin",
        element: <PurchaseCoin></PurchaseCoin>,
      },
    ],
  },
]);

export default router;
