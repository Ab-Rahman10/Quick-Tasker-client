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
import TaskUpdateForm from "../Components/TaskUpdateForm/TaskUpdateForm";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome";
import TaskList from "../Pages/Dashboard/Worker/TaskList";
import MySubmissions from "../Pages/Dashboard/Worker/MySubmissions";
import WithDrawals from "../Pages/Dashboard/Worker/WithDrawals";
import TaskDetails from "../Pages/Dashboard/Worker/TaskDetails";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../Pages/Dashboard/Admin/ManageTasks";
import Payment from "../Pages/Dashboard/Buyer/Payment";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory";
import ContactUs from "../Pages/Home/FAQ/FAQ";
import AllTasks from "../Pages/AllTasks/AllTasks";
import TaskDetailPage from "../Pages/TaskDetailPage/TaskDetailPage";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactInfo from "../Pages/ContactInfo/ContactInfo";

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
      {
        path: "/all-tasks",
        element: <AllTasks></AllTasks>,
      },
      {
        path: "/task-detail-page/:id",
        element: <TaskDetailPage></TaskDetailPage>,
        loader: ({ params }) =>
          fetch(
            `https://quick-tasker-server.vercel.app/task-detail-page/${params.id}`
          ),
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact-info",
        element: <ContactInfo></ContactInfo>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Profile-----------------------------------------

      {
        path: "profile",
        element: <Profile></Profile>,
      },

      // Admin ---------------------------------------
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <AdminRoute>
            <ManageTasks></ManageTasks>
          </AdminRoute>
        ),
      },

      // Buyer---------------------------------------
      {
        path: "buyer-home",
        element: (
          <BuyerRoute>
            <BuyerHome></BuyerHome>
          </BuyerRoute>
        ),
      },
      {
        path: "add-new-task",
        element: (
          <BuyerRoute>
            <AddNewTask></AddNewTask>
          </BuyerRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <BuyerRoute>
            <MyTasks></MyTasks>
          </BuyerRoute>
        ),
      },
      {
        path: "purchase-coin",
        element: (
          <BuyerRoute>
            <PurchaseCoin></PurchaseCoin>
          </BuyerRoute>
        ),
      },
      {
        path: "update-task/:id",
        element: (
          <BuyerRoute>
            <TaskUpdateForm></TaskUpdateForm>
          </BuyerRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://quick-tasker-server.vercel.app/task/${params.id}`),
      },
      {
        path: "payment",
        element: (
          <BuyerRoute>
            <Payment></Payment>
          </BuyerRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <BuyerRoute>
            <PaymentHistory></PaymentHistory>
          </BuyerRoute>
        ),
      },

      // Worker----------------------------------------------
      {
        path: "worker-home",
        element: (
          <WorkerRoute>
            <WorkerHome></WorkerHome>
          </WorkerRoute>
        ),
      },
      {
        path: "task-list",
        element: (
          <WorkerRoute>
            <TaskList></TaskList>
          </WorkerRoute>
        ),
      },
      {
        path: "my-submissions",
        element: (
          <WorkerRoute>
            <MySubmissions></MySubmissions>
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            <WithDrawals></WithDrawals>
          </WorkerRoute>
        ),
      },
      {
        path: "task-details/:id",
        element: (
          <WorkerRoute>
            <TaskDetails></TaskDetails>
          </WorkerRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://quick-tasker-server.vercel.app/task-details/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
